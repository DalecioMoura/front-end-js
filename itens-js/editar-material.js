let habilitaEditar  = false;
let id              = '';
let elemento        = document.querySelectorAll('.ocultar');

for(let i = 0; i<6; i++){
    elemento[i].style.display = 'none'
}

function editarMaterial(){

    if(isLogado == 'true'){

        if(!habilitaEditar){
            buscarDadosParaEdicao();
        }
        else{
            enviarDadosEditados();
        }
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }  
}

async function buscarDadosParaEdicao(){

    let codigo  = document.querySelector('#id-codigo').value;
    let dado    = {"filtro":"codigo","valor":codigo};

    const req   = await fetch(`https://apicontroledematerial.onrender.com/api/item/${JSON.stringify(dado)}`);
    const res   = await req.json();
    
    for(let i = 0; i<6; i++){
        elemento[i].style.display = '';   
    }

    id = res.result[0].id;
    document.getElementById('id-codigo').value      = res.result[0].codigo;
    document.getElementById('id-tipo').value        = res.result[0].tipo;
    document.getElementById('id-local').value       = res.result[0].localizacao;
    document.getElementById('id-serie').value       = res.result[0].n_serie;
    document.getElementById('id-modelo').value      = res.result[0].modelo;
    document.getElementById('id-fabricante').value  = res.result[0].fabricante;
    document.getElementById('id-descricao').value   = res.result[0].descricao;

    let input       = document.querySelector('#id-input-enviar');
    input.value     = 'Editar';
    habilitaEditar  = true;
}

async function enviarDadosEditados(){

    let tipoAux = document.getElementById('id-tipo').value.toLowerCase().split(" ");
    let tipo    = '';

    if(tipoAux != ''){
        tipo = tipoAux.map((trataTipo)=>{return trataTipo[0].toUpperCase() + trataTipo.substring(1)}).join(" ");
    }
    
    const dados = {
        "codigo"        : document.getElementById('id-codigo').value,
        "tipo"          : tipo,//document.getElementById('id-tipo').value,
        "localizacao"   : document.getElementById('id-local').value,
        "n_serie"       : document.getElementById('id-serie').value,
        "modelo"        : document.getElementById('id-modelo').value.toUpperCase(),
        "fabricante"    : document.getElementById('id-fabricante').value.toUpperCase(),
        "descricao"     : document.getElementById('id-descricao').value
        };

    let dadosJSON = JSON.stringify(dados);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${id}`,{
       method: "PUT",
       headers:{"Content-Type": "application/json"},
       body:dadosJSON
    });

    const res       = await req.json();    
    habilitaEditar  = false;

    exibirLista(res.result, "Editar outro ítem");

    exibirMensagem();

    /*document.getElementById('id-codigo').value      = '';
    document.getElementById('id-tipo').value        = '';
    document.getElementById('id-local').value       = '';
    document.getElementById('id-serie').value       = '';
    document.getElementById('id-modelo').value      = '';
    document.getElementById('id-fabricante').value  = '';
    document.getElementById('id-descricao').value   = '';*/
}

function exibirMensagem(){

    document.getElementById('id-codigo').value      = '';
    document.getElementById('id-tipo').value        = '';
    document.getElementById('id-local').value       = '';
    document.getElementById('id-serie').value       = '';
    document.getElementById('id-modelo').value      = '';
    document.getElementById('id-fabricante').value  = '';
    document.getElementById('id-descricao').value   = '';

    for(let i = 0; i<6; i++){
        elemento[i].style.display = 'none'
    }

    let input       = document.querySelector('#id-input-enviar');
    input.value     = 'Buscar';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = 'Item editado com sucesso!'
    msg.style.maxWidth = '500px';
    msg.style.textAlign = 'center';
    msg.style.color = 'red';
    msg.style.backgroundColor = 'yellow';
    msg.style.fontWeight = 'bold';
    msg.style.padding = '10px';
    msg.style.margin = '5px auto';
    msg.style.marginBottom = '100px';
    msg.style.borderRadius = '5px';
    setTimeout(()=>{
        document.getElementById('id-msg').innerHTML = '';
        msg.style.backgroundColor = '';
    }, 5000);
}
