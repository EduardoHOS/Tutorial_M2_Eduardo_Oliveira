const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
var sqlite3 = require('sqlite3').verbose();
var DBPATH = 'login.db';
const db = new sqlite3.Database(DBPATH);

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const hostname = '127.0.0.1';
const port = 3000;

// Servir o arquivo login.html
app.get('/', (req, res) => {
    console.log("socorro")
    res.sendFile(__dirname + '/public/login.html');
  });


  // Retorna todos registros (é o R do CRUD - Read)
app.get('/Login', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM Usuario ORDER BY id_login COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// create 
app.post('/creatLogin',  (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco

	sql = `INSERT INTO Usuario (id_login, usuario, senha) VALUES ('${req.body.id_login}', '${req.body.usuario}', '${req.body.senha}')`;

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	}); 
	res.write('<p>USUARIO INSERIDO COM SUCESSO! é aqui que o filho chora e niguem ve</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Monta o formulário para o update ( get information to Update)
app.get('/atualizaPerfil', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM Usuario WHERE id_login="+ req.query.id_login;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});



//pega tudo 
app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});