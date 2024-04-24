
function consultarUsuarios(){

    let isFiltro = false;

    let nomeAux = document.getElementById('id-nome').value.toLowerCase().split(" ");
    let nome = '';

        if(nomeAux != ''){
            nome = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
        }
    
    let dados = {
        "matricula":    document.getElementById('id-matricula').value.toUpperCase(),
        "nome":         nome,
        "setor":        document.getElementById('id-setor').value.toUpperCase(),
        "email":        document.getElementById('id-email').value.toLowerCase()
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
    document.getElementById('id-email').value       = '';
}