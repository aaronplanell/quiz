var models = require('../models/models.js');

// GET /quizes
exports.index = function (req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	})		
};

// GET /quizes/:quizId(\\d+)
exports.show = function (req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz});
	})		
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function (req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		if (req.query.respuesta === quiz.respuesta) 
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
		else 
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
	})	
};

// GET /quizes/author
exports.author = function (req, res) {
	res.render('quizes/author', {titulo: 'Quiz'});
}
