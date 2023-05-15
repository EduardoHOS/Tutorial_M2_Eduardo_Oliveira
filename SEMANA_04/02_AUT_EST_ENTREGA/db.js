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

//pega tudo 
app.listen(port, hostname, () => {
	console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });

// Tabela profile_tbl ***********************************************************************************************************************************************************

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


  // Tabela experiencia ********************************************************************************************************************************

  //get date
  app.get('/experiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM experiencia ORDER BY nome COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// create 
app.post('/experiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	console.log(req.body.id_perfil)
	sql = `INSERT INTO experiencia (id_experiencia, nome_da_empresa, d_inicio, d_termino, cargo, descricao) VALUES ('${req.body.id_experiencia}', '${req.body.nome_da_empresa}', '${req.body.d_inicio}', '${req.body.d_termino}', '${req.body.cargo}','${req.body.descricao}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>Experiencia inserida COM SUCESSO! </p><a href="/">VOLTAR</a>');
	db.close();
	res.end();
});

// Get information to Update)
app.get('/atualizaExperiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM experiencia WHERE id_experiencia="+ req.query.id_experiencia;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); 
});

// Atualiza (Update)
app.post('/atualizaExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE experiencia SET nome_da_empresa ='" + req.body.nome_da_empresa + "', d_inicio = '" + req.body.d_inicio + "', d_termino='" + req.body.d_termino + "', cargo='" + req.body.cargo + "', descrição='" + req.body.descrição + "' WHERE id_experiencia='" + req.body.id_experiencia + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>Experiencia ATUALIZADO COM SUCESSO psor! Babado em</p><a href="/">VOLTAR</a>');
	db.close(); 
});

// Exclui 
app.get('/removeExperiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM experiencia WHERE id_experiencia=" + req.body.id_experiencia + "";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>Experiencia REMOVIDa COM SUCESSO QUERIDXXXS! </p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

  // tabela formacao ********************************************************************************************************************

  //get date
  app.get('/formacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM formacao ORDER BY nome COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// create 
app.post('/formacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	console.log(req.body.id_curso)
	sql = `INSERT INTO formacao (id_curso, d_inicio, d_termino, cargo, descricao) VALUES ('${req.body.id_curso}', '${req.body.d_inicio}', '${req.body.d_termino}','${req.body.cargo}','${req.body.descricao}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>formacao inserida COM SUCESSO! </p><a href="/">VOLTAR</a>');
	db.close();
	res.end();
});

// Get information to Update)
app.get('/atualizaFormacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM formacao WHERE id_curso="+ req.query.id_curso;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); 
});

// Atualiza (Update)
app.post('/atualizaFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE formacao SET nome_da_empresa ='" + req.body.nome_da_empresa + "', d_inicio = '" + req.body.d_inicio + "', d_termino='" + req.body.d_termino + "', cargo='" + req.body.cargo + "', descrição='" + req.body.descrição + "' WHERE id_curso='" + req.body.id_curso + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>Formacao ATUALIZADO COM SUCESSO psor! Babado em</p><a href="/">VOLTAR</a>');
	db.close(); 
});

// Exclui 
app.get('/removeFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM experiencia WHERE id_curso=" + req.body.id_curso + "";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>Formacao REMOVIDa COM SUCESSO QUERIDXXXS! </p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); 
});

  // tabela habilidades **************************************************************************************************************************************************

  //get date
  app.get('/habilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM habilidades ORDER BY nome COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// create 
app.post('/habilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	console.log(req.body.id_curso)
	sql = `INSERT INTO habilidades (id_habilidades, habilidade1, habilidade2, habilidade3, habilidade4, habilidade5) VALUES ('${req.body.id_habilidades}', '${req.body.habilidade1}', '${req.body.habilidade2}', '${req.body.habilidade3}', '${req.body.habilidade4}','${req.body.habilidade5}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>habilidades inserida COM SUCESSO! </p><a href="/">VOLTAR</a>');
	db.close();
	res.end();
});

// Get information to Update)
app.get('/atualizaHabilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM habilidades WHERE id_habilidades="+ req.query.id_habilidades;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); 
});

// Atualiza (Update)
app.post('/atualizaHabilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE habilidades SET habilidade1 ='" + req.body.habilidade1 + "', habilidade2 = '" + req.body.habilidade2 + "', habilidade3='" + req.body.habilidade3 + "', habilidade4='" + req.body.habilidade4 + "', habilidade5='" + req.body.habilidade5 + "' WHERE id_habilidades='" + req.body.id_habilidades + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>habilidades ATUALIZADO COM SUCESSO psor! </p><a href="/">VOLTAR</a>');
	db.close(); 
});

// Exclui 
app.get('/removeHabilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM habilidades WHERE id_habilidades=" + req.body.id_habilidades + "";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>habilidades REMOVIDa COM SUCESSO QUERIDXXXS! </p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); 
});


  // tabela head_curriculo ****************************************************************************************************************************************************************

  //get date
  app.get('/head', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM head_curriculo ORDER BY nome COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// create 
app.post('/head', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	console.log(req.body.id_curso)
	sql = `INSERT INTO head_curriculo (id_nome, cargo, foto) VALUES ('${req.body.id_nome}', '${req.body.cargo}', '${req.body.foto}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>head_curriculo inserida COM SUCESSO! </p><a href="/">VOLTAR</a>');
	db.close();
	res.end();
});

// Get information to Update)
app.get('/atualizaHead', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM head_curriculo WHERE id_nome="+ req.query.id_nome;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); 
});

// Atualiza (Update)
app.post('/atualizaHead', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE head_curriculo SET cargo ='" + req.body.cargo + "', foto = '" + req.body.foto + "' WHERE id_nome='" + req.body.id_nome + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>head_curriculo ATUALIZADO COM SUCESSO psor! </p><a href="/">VOLTAR</a>');
	db.close(); 
});

// Exclui 
app.get('/removeHead', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM head_curriculo WHERE id_nome=" + req.body.id_nome + "";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>head_curriculo REMOVIDa COM SUCESSO QUERIDXXXS! </p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); 
});

  // personalidades ********************************************************************************************************************************************************

  //get date
  app.get('/personalidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM personalidades ORDER BY nome COLLATE NOCASE';
	
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

// create 
app.post('/personalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	console.log(req.body.id_persona)
	sql = `INSERT INTO personalidades (id_persona, opcao1, opcao2, opcao3, opcao4, opcao5) VALUES ('${req.body.id_persona}', '${req.body.opcao1}', '${req.body.opcao2}', '${req.body.opcao3}', '${req.body.opcao4}','${req.body.opcao5}')`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>personalidades inserida COM SUCESSO! </p><a href="/">VOLTAR</a>');
	db.close();
	res.end();
});

// Get information to Update)
app.get('/atualizaPersonalidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "SELECT * FROM personalidades WHERE id_persona="+ req.query.id_persona;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); 
});

// Atualiza (Update)
app.post('/atualizaPersonalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE personalidades SET opcao1 ='" + req.body.opcao1 + "', opcao2 = '" + req.body.opcao2 + "', opcao3='" + req.body.opcao3 + "', opcao4='" + req.body.opcao4 + "', opcao5='" + req.body.opcao5 + "' WHERE id_persona='" + req.body.id_persona + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>personalidades ATUALIZADO COM SUCESSO psor! </p><a href="/">VOLTAR</a>');
	db.close(); 
});

// Exclui 
app.get('/removePersonalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM personalidades WHERE id_persona=" + req.body.id_persona + "";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>personalidade REMOVIDa COM SUCESSO QUERIDXXXS! </p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); 
});

  // realizacao **********************************************************************************************************************************************************************

    //get date
	app.get('/realizacao', (req, res) => {
		res.statusCode = 200;
		res.setHeader('Access-Control-Allow-Origin', '*');
		var db = new sqlite3.Database(DBPATH); // Abre o banco
		var sql = 'SELECT * FROM realizacao ORDER BY nome COLLATE NOCASE';
		
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close();
	});
	
	// create 
	app.post('/realizacao', urlencodedParser, (req, res) => {
		res.statusCode = 200;
		res.setHeader('Access-Control-Allow-Origin', '*'); 
		var db = new sqlite3.Database(DBPATH); 
		console.log(req.body.id_curso)
		sql = `INSERT INTO realizacao (id_realizacao, realizacao, ano_realizacao, descricao_realizacao) VALUES ('${req.body.id_realizacao}', '${req.body.realizacao}', '${req.body.ano_realizacao}', '${req.body.descricao_realizacao}')`;
		console.log(sql);
		db.run(sql, [],  err => {
			if (err) {
				throw err;
			}	
		});
		res.write('<p>realizacao inserida COM SUCESSO! </p><a href="/">VOLTAR</a>');
		db.close();
		res.end();
	});
	
	// Get information to Update)
	app.get('/atualizaRealizacao', (req, res) => {
		res.statusCode = 200;
		res.setHeader('Access-Control-Allow-Origin', '*'); 
		sql = "SELECT * FROM realizacao WHERE id_realizacao="+ req.query.id_realizacao;
		console.log(sql);
		var db = new sqlite3.Database(DBPATH);
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); 
	});
	
	// Atualiza (Update)
	app.post('/atualizaRealizacao', urlencodedParser, (req, res) => {
		res.statusCode = 200;
		res.setHeader('Access-Control-Allow-Origin', '*'); 
		sql = "UPDATE realizacao SET realizacao ='" + req.body.realizacao + "', ano_realizacao = '" + req.body.ano_realizacao + "', descricao_realizacao='" + req.body.descricao_realizacao + "' WHERE id_realizacao='" + req.body.id_realizacao + "'";
		console.log(sql);
		var db = new sqlite3.Database(DBPATH); 
		db.run(sql, [],  err => {
			if (err) {
				throw err;
			}
			res.end();
		});
		res.write('<p>realizacao ATUALIZADO COM SUCESSO psor! </p><a href="/">VOLTAR</a>');
		db.close(); 
	});
	
	// Exclui 
	app.get('/removeRealizacao', urlencodedParser, (req, res) => {
		res.statusCode = 200;
		res.setHeader('Access-Control-Allow-Origin', '*'); 
		sql = "DELETE FROM realizacao WHERE id_realizacao=" + req.body.id_realizacao + "";
		console.log(sql);
		var db = new sqlite3.Database(DBPATH); // Abre o banco
		db.run(sql, [],  err => {
			if (err) {
				throw err;
			}
			res.write('<p>realizacao REMOVIDa COM SUCESSO QUERIDXXXS! </p><a href="/">VOLTAR</a>');
			res.end();
		});
		db.close(); 
	});