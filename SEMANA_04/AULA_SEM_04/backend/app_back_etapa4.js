const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';
const port = 3071;
const app = express();
const upload = multer();
app.use(upload.none());
/* Servidor aplicação */
app.use(express.static("../frontend/"));
app.use(express.json());
/* Definição dos endpoints */
/******** CRUD ************/
app.get('/showuserparam', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	console.log("GET - req.body:");
	console.log(req.body);
	console.log("GET - req.params:");
	console.log(req.params);
	console.log("GET - req.query:");
	console.log(req.query);
	res.end();
});
app.post('/showuserparam2', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	console.log("POST - req.body:");
	console.log(req.body);
	console.log("POST - req.params:");
	console.log(req.params);
	console.log("POST - req.query:");
	console.log(req.query);
	res.end();
});
app.listen(port, hostname, () => {
  console.log(`Page server running at http://${hostname}:${port}/`);
  console.log("Endpoints:");
  console.log(`Page server running at http://${hostname}:${port}/showuserparam`);
  console.log(`Page server running at http://${hostname}:${port}/showuserparam2`);
});