
let habilitaEditar = false;
let id = '';
let isFiltro = false;

document.getElementById('tr-nome').style.display = 'none';
document.getElementById('tr-setor').style.display = 'none';
document.getElementById('tr-email').style.display = 'none';

function editarUsuario(){

    if(isLogado == 'true'){
        let nomeAux = document.getElementById('id-nome').value.toLowerCase().split(" ");
        let nome = '';

        if(nomeAux != ''){
            nome = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
        }

        let dados = {
            "matricula":    document.getElementById('id-matricula').value,
            "nome":         nome,
            "setor":        document.getElementById('id-setor').value.toUpperCase(),
            "email":        document.getElementById('id-email').value.toLowerCase()
        };
    
        let filtro      = {"filtro":'', "valor":''};
    
        if(!habilitaEditar){
            for(let i in dados){
                if(dados[i] !== '' && dados[i] !== null){
                    filtro.filtro   = i;
                    filtro.valor    = dados[i];
                    isFiltro = true;
                    break; 
                }
            }
            if(isFiltro){
                buscarDados(filtro);
                isFiltro = false;
            }
            else
                console.log('Usuário não encontrado!')
        }
        else
            editarDados();
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }  
}

async function buscarDados(filtro){
    
    let filtroJson = JSON.stringify(filtro);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${filtroJson}`);
    const res = await req.json();

    let usuario =res.result[0];

    if(res.result == ''){
        console.log('Dados não encontrados!');
        return;
    }

    id = usuario.id;
    
    document.getElementById('tr-nome').style.display = '';
    document.getElementById('tr-setor').style.display = '';
    document.getElementById('tr-email').style.display = '';
  
    document.getElementById('id-matricula').value = usuario.matricula;
    document.getElementById('id-nome').value = usuario.nome;
    document.getElementById('id-setor').value = usuario.setor;
    document.getElementById('id-email').value = usuario.email;

    let input = document.getElementById('id-input-enviar');
    input.value = 'Editar';

    habilitaEditar = true;
}

async function editarDados(){
    
    let nomeAux = document.getElementById('id-nome').value.toLowerCase().split(" ");
    let nome = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
    let apelido = nome.substring(0, nome.indexOf(' '));
    let email = document.getElementById('id-email').value;
    let usuario = email.substring(0, email.indexOf('@'));
    
    const dados = {
        "matricula":document.getElementById('id-matricula').value,
        "nome":nome,
        "apelido":apelido,
        "setor":document.getElementById('id-setor').value.toUpperCase(),
        "email":document.getElementById('id-email').value.toLowerCase(),
        "usuario":usuario.toLowerCase()
    };

    
    let dadosJson = JSON.stringify(dados);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${id}`,{
        method:'PUT',
        headers:{"Content-Type":'application/json'},
        body:dadosJson
    });

    const res = await req.json();
    
    habilitaEditar = false;
    
    exibirUsuarios(res.result, 'Editar outro usuário');

    exibirMensagem();

}

function exibirMensagem(){
    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    document.getElementById('id-email').value       = '';
        
    document.getElementById('tr-nome').style.display    = 'none';
    document.getElementById('tr-setor').style.display   = 'none';
    document.getElementById('tr-email').style.display   = 'none';
    document.getElementById('id-input-enviar').value    = 'Buscar';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = 'Cadastro de usuário editado com sucesso!'
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