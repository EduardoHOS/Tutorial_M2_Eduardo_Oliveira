/* Função que calcula uma soma e mostra a operação realizada e o resultado obtido */
function calcula(x, y){
    var op = "+";
    var resultado;
    if (op == "+") {
        resultado = x + y;
    };
}

function calcula(){
	var num1 = Number(document.getElementById("num1").value);
	var num2 = Number(document.getElementById("num2").value);
	var op = document.getElementById("op").value;
	var resultado;
	
	if (op == "+") {
		resultado = num1 + num2;
	} else if (op == "-") {
		resultado = num1 - num2;
	} else if (op == "*") {
		resultado = num1 * num2;
	} else if (op == "/") {
		resultado = num1 / num2;
	};
	
	document.getElementById("saida").innerHTML = `${num1} ${op} ${num2} = ${resultado}`;
	console.log(`${num1} ${op} ${num2} = ${resultado}`)
}