var getResDiv = "#get";
var getDBResDiv = "#getDB";

/* Função que faz um requisição GET */
function TestGET(){
    var url = "https://jsonplaceholder.typicode.com/todos/1";

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    $(getResDiv).append("<br />" + xhttp.responseText);
    $(getResDiv).append("<br />" + xhttp.responseText.title);
}

/* Função que faz um requisição GET no nosso banco de dados */
function TestGETDB(){
    var url = "http://127.0.0.1:3000/perfil";
    var resposta;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    resposta = JSON.parse(xhttp.responseText);
    $(getDBResDiv).append("<br /><br />" + JSON.stringify(resposta));
}