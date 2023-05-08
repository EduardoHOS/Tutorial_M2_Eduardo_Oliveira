const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/resume.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static("./html/index.html/"));

app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get('/perfil', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM profile_tbl ORDER BY nome COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// create 
app.post('/perfil', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	console.log(req.body.id_perfil)
	// sql = "INSERT INTO profile_tbl (id_perfil, email, descricao, idade, nome) VALUES ('" + req.body.id_perfil + "', '" + req.body.email + "', '" + req.body.descricao + "', '" + req.body.idade + "','" +req.body.nome"')";
	sql = `INSERT INTO profile_tbl (id_perfil, email, descricao, idade, nome) VALUES ('${req.body.id_perfil}', '${req.body.email}', '${req.body.descricao}', '${req.body.idade}', '${req.body.nome}')`;

	// sql = `INSERT INTO profile_tbl ${teste}, nome da tabela
	console.log(sql);
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
	sql = "SELECT * FROM profile_tbl WHERE id_perfil="+ req.query.id_perfil;
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

// Atualiza (put information to Update)
app.post('/atualizaPerfil', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE profile_tbl SET email ='" + req.body.email + "', descricao = '" + req.body.descricao + "', idade='" + req.body.idade  + "', nome='" + req.body.nome + "' WHERE id_perfil='" + req.body.id_perfil + "'";
	          //VALUES ('${req.body.id_perfil}', '${req.body.email}', '${req.body.descricao}', '${req.body.idade}', '${req.body.nome}')`
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>USUARIO ATUALIZADO COM SUCESSO psor! Babado em</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removePerfil', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM profile_tbl WHERE id_perfil=" + req.body.id_perfil + "";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>USUARIO REMOVIDO COM SUCESSO QUERIDXXXS! Obs: foi um parto fazer isso sozinho</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
	console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });