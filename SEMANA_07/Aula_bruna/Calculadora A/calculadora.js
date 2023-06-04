
function calculoCompatibilidade() {
    var nome1Rec = document.getElementById('nome1').value;
    var nome2Rec = document.getElementById('nome2').value;
  
    var compatibilidade = Math.floor(Math.random() * 101);
  
    var resultado = nome1Rec + " é " + compatibilidade + "% compatível com " + nome2Rec;
    document.getElementById('calculado').textContent = resultado;
  }
  