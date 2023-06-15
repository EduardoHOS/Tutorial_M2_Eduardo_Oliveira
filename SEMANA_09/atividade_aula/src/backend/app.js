// Importing node modules and configuring they;
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const DBPATH = './data/banco.db'
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(`./front`));

// Analisar o corpo da requisição
app.use(express.urlencoded({ extended: false }))

app.use(express.json());

app.get('/insere', (req, res) => {
    res.sendFile(path.join(__dirname, ".." + '/front/insere.html'));
});

app.get('/mostre', (req, res) => {
    res.sendFile(path.join(__dirname, ".." + '/front/mostra.html'));
});

app.post('/inserir', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = `INSERT INTO Tabela (mensagens) VALUES ('${req.body.mensagem}')`
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
    });
    res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
    res.end();
});

app.get('/mostrar', (req, res) =>{
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = `SELECT mensagens FROM Tabela`
    console.log(sql);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
})

app.get


app.listen(8081, function(){
    console.log("Servidor rodando na URL: http://localhost:8081");
});


