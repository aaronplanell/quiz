var models = require('../models/models.js');

//Variable de debug. Solo se activa si estamos en modo local. Es decir, utilizando SQLite
var debug  = process.env.DATABASE_URL.substring(0, 6);
if (debug === "sqlite") debug = true; 
else debug = false;
exports.debug = debug;

// Autoload
exports.load = function(req, res, next, quizId) {
	if (debug) console.log("quiz_controller.js: Running exports.load");

	models.Quiz.findById(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else 
				next(new Error ('No existe quizId=' + quizId));
		}
	).catch(function(error) { next(error); } )
};

// GET /quizes
exports.index = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.index");

	//Param Search
	var search = req.query.search;
	if (debug) console.log("quiz_controller.js: search = " + search); 

	// Con búsqueda
	if (search!==undefined && search!=="") {
		search = search.replace(" ", "%");
		search = "%" + search + "%";
		models.Quiz.findAll({where: ["pregunta like ?", search], order: ["pregunta"]}).then(function(quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) { next(error); } )			
	} 
	// Sin búsqueda
	else {
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) { next(error); } )			
	};
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.show");

	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.answer");

	if (req.query.respuesta === req.quiz.respuesta) 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', errors: []});
	else 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', errors: []});
};

// GET /quizes/search
exports.search = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.search");

	res.render('quizes/search', {titulo: 'Quiz', errors: []});
}

// GET /quizes/new
exports.new = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.new");

	var quiz = models.Quiz.build({ pregunta: "Pregunta", respuesta: "Respuesta"});
	res.render('quizes/new', {quiz: quiz, errors: []});
}

// GET /quizes/edit
exports.edit = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.edit");

	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
}

// GET /quizes/create
exports.create = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.create");

	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then(
		function(err){
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz
					.save({fields: ["pregunta", "respuesta"]}) //Guardar
					.then(function() {res.redirect("/quizes"); //Redireccionar
				})
			}
		}
	)
}

// GET /quizes/update
exports.update = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.update");

	req.quiz.pregunta 	= req.body.quiz.pregunta;
	req.quiz.respuesta 	= req.body.quiz.respuesta;

	req.quiz.validate().then(
		function(err){
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz
					.save({fields: ["pregunta", "respuesta"]}) //Guardar
					.then(function() {res.redirect("/quizes"); //Redireccionar
				})
			}
		}
	)
}
// GET /quizes/author
exports.author = function (req, res) {
	if (debug) console.log("quiz_controller.js: Running exports.author");

	res.render('quizes/author', {titulo: 'Quiz', errors: []});
}
