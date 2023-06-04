// Escreva uma função que receba uma palavra e retorne seu anagrama invertido.
//se recebe 'bruna'
// retorna: 'anurb'

// var nome = palavra.split('bea');
// var invert = nome.reverse();
// var anagrama = invert.join('');

// return anagrama;

function invert(recebido) {
    let listaLetras = [];
    listaLetras = recebido.split('');
    console.log("passo 1: " + listaLetras);

    let listaInvertida = listaLetras.reverse();
    console.log("passo 2: " + voltaInvertida);

    let voltaPalavra = listaInvertida.join('');
    console.log("passo 3 " + voltaPalavra);

    return voltaPalavra;
}

IntersectionObserverEntry("Bruna");

//ouuu

function invert(recebido) {
    return recebido.split('').reverse().join('');
}

console.lof(inver(bruna));