
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
    
    let nomeAux = document.getElementById('id-nome').value.toLowerCase().split(" ");
    let nome = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
    let email = document.getElementById('id-email').value;
    let apelido = nome.substring(0, nome.indexOf(' '));
    let usuario = email.substring(0, email.indexOf('@'));
    
    let dados = {
        "matricula":    document.getElementById('id-matricula').value,
        "nome":         nome,
        "apelido":      apelido,
        "setor":        document.getElementById('id-setor').value.toUpperCase(),
        "email":        document.getElementById('id-email').value.toLowerCase(),
        "usuario":      usuario.toLowerCase()
    };

    return dados;
}

function exibirMensagem(){
    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    document.getElementById('id-email').value       = '';

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