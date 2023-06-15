function enviar() {
    // console.log('teste');
    let mensagem = $('input');
    mensagem = mensagem[0].value
    console.log(mensagem);
    enviarDados(mensagem);
}

 async function enviarDados(mensagem) {
    $.post('/inserir', {mensagem: mensagem}, (response) => {
        console.log(response);
        alert(response);
        window.location.href = '/mostre';
    })
}

function mostrar() {
    $.get('/mostrar', (res) => {
        console.log(res);
        res.map((item) => {
            console.log(item.mensagens)
            const paragraph = $('<p>');
            const div = $('#mensagens');
            paragraph.text(item.mensagens);
            div.append(paragraph);
        })
    })
}