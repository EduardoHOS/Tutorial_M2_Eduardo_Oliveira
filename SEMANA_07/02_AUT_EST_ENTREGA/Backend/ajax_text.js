// // Profile 
// let nome = document.querySelector("#nome");
// let email = document.querySelector("#email");
// let descricao = document.querySelector("#descricao");
// let idade = document.querySelector("#idade");

// let form = document.querySelector("form");

// form.addEventListener("submit", function(event) {
//   event.preventDefault();

//   let dados = {
//     nome: nome.value,
//     email: email.value,
//     descricao: descricao.value,
//     idade: idade.value
//   };

//   enviarDados(dados);
// });

// function enviarDados(dados) {
//   fetch('http://127.0.0.1:3000/perfil', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(dados)
//   })
//   .then(function(response) {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Erro ao enviar os dados: ' + response.status);
//     }
//   })
//   .then(function(response) {
//     console.log(response);
//     alert("Dados salvos com sucesso!");
//   })
//   .catch(function(error) {
//     console.error(error);
//     alert("Erro ao enviar os dados. Verifique o console para mais informações.");
//   });
// }

//-----------------------------------------------------------------------------------------------------------------------------------------

app.post('/perfil', urlencodedParser, (req, res) => {
    // Extrai os dados do formulário
    const { nome, email, descricao, idade } = req.body;
  
    // Crie um objeto com os dados do formulário
    const profileData = {
      nome,
      email,
      descricao,
      idade
    };
  
    // Envie os dados para o backend
    fetch('http://localhost:3000/perfil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    })
      .then(response => {
        // Lida com a resposta do backend
        if (response.ok) {
          console.log('Usuário inserido com sucesso!');
          // Faça algo após o sucesso, se necessário
        } else {
          console.error('Erro ao inserir usuário.');
          // Faça algo para lidar com o erro, se necessário
        }
      })
      .catch(error => {
        console.error('Erro ao enviar dados para o backend:', error);
        // Faça algo para lidar com o erro, se necessário
      });
  
    // Impede que o formulário seja enviado normalmente
    event.preventDefault();
  });
  