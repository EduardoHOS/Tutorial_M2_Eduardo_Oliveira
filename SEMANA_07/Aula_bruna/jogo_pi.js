//Jogo do PI 
// 1,2,3,PI,5,6,7,PI,...
//Criar uma função jogoPI(qnt,pi) que retorne uma sequencia de numeros seguindo a regra do jogo do Pi. 
//A função deve receber a quantidade 'qnt'do numero de sequencia e o valor de Pi. 

//No jogo do PI, todo número multiplo de PI deve ser substituido por "PI"

function jogoPi (qnt,pi) {
    seqPI = [];
    for (var cont = 1; cont <=qnt; cont++) {
        if (cont % pi === 0) {
            seqPI.push("PI");
        }
        else {
            seqPI.push(cont);}
        }
        return seqPI;
    }

    console.log(jogoPI(10,2));