var models = require('../models/models.js');

//Variable de debug. Solo se activa si estamos en modo local. Es decir, utilizando SQLite
var debug  = process.env.DATABASE_URL.substring(0, 6);
if (debug === "sqlite") debug = true; 
else debug = false;
exports.debug = debug;

// ToDo: Se debería sustituir por una tabla con el campo password encriptado
var users = {
	admin: {id:1, username:"admin", 		password:"topsecret"},
	aaron: {id:2, username:"Aaron Planell", password:"topsecret"}
	};

// Comprueba si el usuario está registrado en users
// Si la autenticación falla o hay errores se ejecuta el callback(error)
exports.autenticar = function(login, password, callback){
	if (debug) console.log("user_controller.js: Running exports.autenticar");

	//Si el usuario existe
	if(users[login]) {
		//Si la clave coincide
		if(password === users[login].password) {
			if (debug) console.log(" Creating session for: " + login);
			callback(null, users[login]);
		}
		else
			callback(new Error('Password erróneo.'));
	} else {
		callback(new Error('Usuario no registrado.'));
	}
}
