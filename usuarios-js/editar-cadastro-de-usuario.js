
let habilitaEditar = false;
let id = '';
let isFiltro = false;

function editarUsuario(){

    let dados = {
        "matricula":    document.getElementById('id-matricula').value,
        "nome":         document.getElementById('id-nome').value,
        "setor":        document.getElementById('id-setor').value,
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

async function buscarDados(filtro){
    
    let filtroJson = JSON.stringify(filtro);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${filtroJson}`);
    const res = await req.json();

    console.log(res.result);

    let usuario =res.result[0];
    id = usuario.id;
  
    document.getElementById('id-matricula').value = usuario.matricula;
    document.getElementById('id-nome').value = usuario.nome;
    document.getElementById('id-setor').value = usuario.setor;

    let input = document.getElementById('id-input-enviar');
    input.value = 'Editar';

    habilitaEditar = true;
}

async function editarDados(){
    
    let nome = document.getElementById('id-nome').value;
    let apelido = nome.substring(0, nome.indexOf(' '));

    const dados = {
        "matricula":document.getElementById('id-matricula').value,
        "nome":nome,
        "apelido":apelido,
        "setor":document.getElementById('id-setor').value
    };

    let dadosJson = JSON.stringify(dados);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${id}`,{
        method:'PUT',
        headers:{"Content-Type":'application/json'},
        body:dadosJson
    });

    const res = await req.json();

    console.log(res.result);
    
    habilitaEditar = false;
    
    exibirUsuarios(res.result, 'Editar outro usuário');

    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    let input = document.getElementById('id-input-enviar');
    input.value = 'Buscar';
}