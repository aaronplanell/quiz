var express = require('express');
var router = express.Router();

var quizController    = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Session
router.get('/login', 									sessionController.new);
router.post('/login', 									sessionController.create);
router.get('/logout', 									sessionController.destroy);

//Quizes
router.get("/quizes", 									quizController.index);
router.get("/quizes/:quizId(\\d+)", 					quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", 				quizController.answer);
router.get("/quizes/:quizId(\\d+)/edit", 				sessionController.loginRequired, quizController.edit);
router.get("/quizes/search", 							quizController.search);
router.get("/quizes/new", 								sessionController.loginRequired, quizController.new);
router.post("/quizes/create",							sessionController.loginRequired, quizController.create);
router.put("/quizes/:quizId(\\d+)",						sessionController.loginRequired, quizController.update);
router.delete("/quizes/:quizId(\\d+)",					sessionController.loginRequired, quizController.destroy);

//Comments
router.get("/quizes/:quizId(\\d+)/comments/new", 		commentController.new);
router.post("/quizes/:quizId(\\d+)/comments/create",	commentController.create);
router.get("/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish", 
														sessionController.loginRequired, commentController.publish);
//Statistics
router.get("/quizes/statistics", 						quizController.calcStatistics, quizController.showStatistics);

//Author
router.get("/quizes/author", 							quizController.author);

module.exports = router;
