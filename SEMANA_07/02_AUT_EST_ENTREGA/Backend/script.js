api = 'http://127.0.0.1:3000'

$(document).ready(() => {
    users.list();
});

var users = {
    
    list() {
        $.ajax({
            url: api + '/perfil',
            type: 'GET',
            success: data => {
                var tx = '';
                tx += '<div class="insert" onclick="user.insert()">Inserir curriculo</div>';
                data.forEach(element => {
                    tx += '<div class="perfil">';
                        tx += '<div class="title">' + `${element.id_perfil} - ${element.email} - ${element.descricao} - ${element.idade} - ${element.nome} ` + '</div>';
                        tx += '<div class="actions">';
                        tx += '<div class="action" onclick="user.update(\'' + element.id_perfil + '\',\'' + element.nome + '\',\'' + element.email + '\',\'' + element.descricao + '\',\'' + element.idade + '\')">Editar</div>';                          
                        tx += '</div>';
                    tx += '</div>';
                });
                $('#main').html(tx);
            }
        });
        
    }
    
};

var user = {

    insert() {
        var nome = prompt('Digite o nome:');
        var email = prompt('Digite o email:');
        var descricao = prompt('Digite a descrição:');
        var idade = prompt('Digite o idade:');

        console.log(`${nome} - ${email} - ${descricao} - ${idade} `);
        if (nome && email && descricao && idade) {
            if (nome.trim() != '' && email.trim() != '' && descricao.trim() != '' && idade.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/atualizaPerfil',
                    data: {nome: nome, email: email, descricao: descricao, idade: idade},
                }).done(function () {
                    perfil.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },


    update(id_perfil, oldTitle) {

        var nome = prompt('Digite o novo nome:', oldTitle);
        if (nome) {
            if (nome.trim() != '') {
                $.ajax({
                    type: 'POST',
                    url: api + '/userupdate',
                    data: {nome: nome, id_perfil: id_perfil, email: email, descricao: descricao, idade: idade },
                }).done(function () {
                    perfil.list();
                }).fail(function (msg) {
                    //console.log('FAIL');
                }).always(function (msg) {
                    //console.log('ALWAYS');
                });
            }
        }
    },

    delete(userId) {

        if (confirm('Confirma a exclusão?')) {
            $.ajax({
                type: 'POST',
                url: api + '/removePerfil',
                data: {userId: userId},
            }).done(function () {
                perfil.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    },

}