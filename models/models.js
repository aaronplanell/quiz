var path = require('path');

// Postgress DATABASE_URL = postgres://username:password@host:port/db
// Postgress DATABASE_URL = postgres://username:password@ec2-54-217-202-108.eu-west-1.compute.amazonaws.com:5432/d9aj1hcb0ahq5c
// SQlite 	 DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user 		= (url[2]||null);
var pwd 		= (url[3]||null);
var protocol	= (url[1]||null);
var dialect		= (url[1]||null);
var port 		= (url[5]||null);
var host		= (url[4]||null);
var storage		= process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgress
var sequelize = new Sequelize(DB_name, user, pwd, 
						{
							dialect: protocol, 
							protocol: protocol,
							port: port,
							host: host,
							storage: storage,
							omitNull: true
						}
					);

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Exportar definición de la tabla Quiz
exports.Quiz = Quiz;

// squelize.sync() crea e inicializa la tabala de preguntas en BBDD
sequelize.sync().then(function (count) {

	// then(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		//La tabla se inicializa solo si está vacía
		if (count === 0) {
			Quiz.create({ pregunta:  'Capital de Italia',
						  respuesta: 'Roma'
						});
			Quiz.create({ pregunta:  'Capital de Francia',
						  respuesta: 'París'
						})
			.then(function(){
				console.log('Base de datos inicializada.');
			});
		};
	});
});