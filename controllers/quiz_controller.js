// GET /quizes/question
exports.question = function (req, res) {
	res.render('quizes/question', {titulo: 'Quiz', pregunta: 'Capital de Italia'});
}

// GET /quizes/answer
exports.answer = function (req, res) {
	if (req.query.respuesta === 'Roma') {
		res.render('quizes/answer', {titulo: 'Quiz', respuesta: 'Correcto'});
	}
	else {
		res.render('quizes/answer', {titulo: 'Quiz', respuesta: 'Incorrecto'});
	}
}

// GET /quizes/author
exports.author = function (req, res) {
	res.render('quizes/author', {titulo: 'Quiz'});
}
