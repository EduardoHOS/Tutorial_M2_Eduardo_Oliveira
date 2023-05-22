
        const url = '/coletores';
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((coletores) => {
                var saida = '<table border=5';
                coletores.forEach((elemento) => {
                    saida += "<tr><tr>" + elemento.NOME_COLETOR + "</tr></tr>";
                });
                saida += "</table>"
                document.getElementById('resultado').innerHTML = saida;
            });
            
