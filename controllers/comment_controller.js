var models = require('../models/models.js');

//Variable de debug. Solo se activa si estamos en modo local. Es decir, utilizando SQLite
var debug  = process.env.DATABASE_URL.substring(0, 6);
if (debug === "sqlite") debug = true; 
else debug = false;
exports.debug = debug;

// Autoload
exports.load = function(req, res, next, commentId) {
	if (debug) console.log("comment_controller.js: Running exports.load");

	models.Comment.find({
		where: { id: Number(commentId)}
	}).then(function(comment) {
		if (comment) {
			req.comment = comment;
			next();
		} else {
			next(new Error('No existe el comentario con identificador: ' + commentId));
		}
	}).catch(function(error){next(error)});
}

// GET /quizes/:quizId(\\d+)/comments/new
exports.new = function (req, res) {
	if (debug) console.log("comment_controller.js: Running exports.new");

	res.render('comments/new', {QuizId: req.params.quizId, errors: []});
}

// GET /quizes/:quizId(\\d+)/comments/create
exports.create = function (req, res) {
	if (debug) console.log("comment_controller.js: Running exports.create");

	var comment = models.Comment.build( { texto: req.body.comment.texto, 
										  QuizId: req.params.quizId } );

	comment.validate().then(
		function(err){
			if (err) {
				res.render('comments/new', {comment: comment, QuizId: req.params.quizId, errors: err.errors});
			} else {
				comment
					.save() //Guardar
					.then(function() {res.redirect("/quizes/" + req.params.quizId); //Redireccionar
				})
			}
		}
	)
}

// GET /quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish
exports.publish = function (req, res) {
	if (debug) console.log("comment_controller.js: Running exports.publish");

	req.comment.publicado = true;
	req.comment.save( {fields: ["publicado"]})
		.then(function() { res.redirect('/quizes/' + req.params.quizId); })
		.catch(function(error){next(error)});
}