var models = require('../models/models.js');

//Variable de debug. Solo se activa si estamos en modo local. Es decir, utilizando SQLite
var debug  = process.env.DATABASE_URL.substring(0, 6);
if (debug === "sqlite") debug = true; 
else debug = false;
exports.debug = debug;

// GET /login . Formulario de Login
exports.new = function (req, res) {
	if (debug) console.log("session_controller.js: Running exports.new");

	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
}

// POST /login . Realización del login mediante un usuario/clave dados
exports.create = function (req, res) {
	if (debug) console.log("session_controller.js: Running exports.create");

	var login			= req.body.login;
	var password		= req.body.password;
	var userController 	= require('./user_controller');

	userController.autenticar(login, password, function(error, user) {

		// Si hay error de login, devolvemos el mensaje
		if (error) {
			req.session.errors = [{"message": "Se ha producido un error: " + error}];
			res.redirect("/login");
			return;
		}

		// Crear req.session.user y guardar campos de Id y Usuario
		// La sesión se define por la existencia de req.session.user
		req.session.user = { id:user.id, username:user.username };
		
		// Redireccionamos al path original
		res.redirect(req.session.redir.toString());
	});
}

// DELETE /logout . Destruir la sesión y salir.
exports.destroy = function(req, res) {
	if (debug) console.log("session_controller.js: Running exports.destroy");

	// Eliminamos la sesión
	delete req.session.user;

	// Redireccionamos al path original
	res.redirect(req.session.redir.toString());
}