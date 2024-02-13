
async function cadastrarUsuario(){

    if(isLogado == 'true'){
        
        let dados = pegaForm();

        let dadosJson = JSON.stringify(dados);

        const req = await fetch('https://apicontroledematerial.onrender.com/api/usuario',{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: dadosJson
        });

        const res = await req.json();

        exibirUsuarios(res.result,'Cadastrar outro usuário');
        reset();
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }
}

function pegaForm(){
    let nome = document.getElementById('id-nome').value;
    let apelido = nome.substring(0, nome.indexOf(' '));
    let dados = {
        "matricula":    document.getElementById('id-matricula').value,
        "nome":         nome,
        "apelido":      apelido,
        "setor":        document.getElementById('id-setor').value

    };

    return dados;
}
function reset(){
    document.getElementById('id-matricula').value = '';
    document.getElementById('id-nome').value = '';
    document.getElementById('id-setor').value = '';
}