const express = require('express');
const bodyParser = require ('body-parser')
const urlencodedParser = bodyParser.urlencoded ({extended: false});

const sqlite3 = require('sqlite3').verbose()
const DBPATH = '../data/bancoPessoas.db'

const hostname = 'localhost';
const port = 3000;
const app = express();

app.use(express.static("../frontend/"));
app.use(express)



app.get('/listar', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Acess-Control-Allow-Origin','*');
    var db = new sqlite3.Database(DBPATH) //ABRE O BANCO 

})


app.post('/inserirPessoa', urlencodedParser, (req,res) =>{

})