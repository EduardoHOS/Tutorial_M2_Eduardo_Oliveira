
const form = document.getElementById('form')

form.addEventListener("submit", async (e) => {
    console.log("okoko")
    e.preventDefault()

    const formData = new FormData(e.target)
    const id_login = formData.get("id")
    const senha = formData.get("senha")
    const usuario = formData.get("usuario")

    console.log(id_login)

    fetch('/creatLogin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id_login: id_login,
            senha: senha,
            usuario: usuario
        })
    });
})

function criaUsuario() {
    var id_login = parseInt($("#recebeId").val());
    var usuario = $("#recebeUsuario").val();
    var senha = $("#recebeSenha").val();

    var json = {
                "id_login":id_login,
                "usuario":usuario,
                "senha":senha
                }
    console.log(json)
    $.post("http://127.0.0.1:3000/creatLogin"), json
};
