// function soma(a,b) {
//   return a + b;
// }

// console.log(soma(5,3)); 



// Tabela de Preços 

var morango = 5;
var uva = 30;
var pessego = 32;
var banana = 11;
var melancia = 32;
var manga = 7;
var budget = 20;

function divisao(budget, morango) {
  return budget / morango;
}

var quantidade = divisao(budget, morango);
console.log(quantidade);



// Resolução lousa 

function quantas(fruta, dinheiro){
    var qntCompra = Math.floor(dinheiro/fruta);
    console.log("Você pode comprar " + qntCompra + " fruta(s) desse tipo");
    return dinheiro % (qntCompra*fruta);}

console.log(quantas(manga,39));

