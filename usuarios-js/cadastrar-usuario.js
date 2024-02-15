
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
        exibirMensagem();
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

function exibirMensagem(){
    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = 'Usuário cadastrado com sucesso!'
    msg.style.maxWidth = '500px';
    msg.style.textAlign = 'center';
    msg.style.color = 'red';
    msg.style.backgroundColor = 'yellow';
    msg.style.fontWeight = 'bold';
    msg.style.padding = '10px';
    msg.style.margin = '20px auto';
    msg.style.borderRadius = '5px';
    setTimeout(()=>{
        document.getElementById('id-msg').innerHTML = '';
        msg.style.backgroundColor = '';
    }, 5000);
}