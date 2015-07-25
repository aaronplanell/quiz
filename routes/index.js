var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload
router.param('quizId', quizController.load);

//Quizes
router.get("/quizes", 									quizController.index);
router.get("/quizes/:quizId(\\d+)", 					quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", 				quizController.answer);
router.get("/quizes/search", 							quizController.search);
router.get("/quizes/new", 								quizController.new);
router.post("/quizes/create",							quizController.create);

//Author
router.get("/quizes/author", 							quizController.author);

module.exports = router;
