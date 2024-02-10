let matricula = document.getElementById('id-matricula').value;
let nome = document.getElementById('id-nome').value;
let setor = document.getElementById('id-setor').value;

async function cadastrarUsuario(){
    let matricula = document.getElementById('id-matricula').value;
let nome = document.getElementById('id-nome').value;
let setor = document.getElementById('id-setor').value;
    console.log(nome+'\n'+matricula+'\n'+setor)

    exibirUsuarios('','Cadastrar outro usuário');
}