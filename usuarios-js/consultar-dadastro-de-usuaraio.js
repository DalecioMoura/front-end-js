
function consultarUsuarios(){

    let isFiltro = false;
    
    let dados = {
        "matricula":    document.getElementById('id-matricula').value,
        "nome":         document.getElementById('id-nome').value,
        "setor":        document.getElementById('id-setor').value,
    };
    
    let filtro      = {"filtro":'', "valor":''};

    for(let i in dados){
        if(dados[i] !== '' && dados[i] !== null){
            filtro.filtro   = i;
            filtro.valor    = dados[i];
            isFiltro = true;
            break;
            
        }
    }

    if(isFiltro){
        comFiltro(filtro);
        isFiltro = false;
    }
    else
        semFiltro();

    limparDados();
}

async function semFiltro(){

    const req = await fetch('https://apicontroledematerial.onrender.com/api/usuarios');
    const res = await req.json();

    exibirUsuarios(res.result, "Nova Consulta");  
}

async function comFiltro(filtro){

    let filtroJson = JSON.stringify(filtro);
    
    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${filtroJson}`);
    const res = await req.json();

    exibirUsuarios(res.result, "Nova Consulta");
}

function limparDados(){
    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
}