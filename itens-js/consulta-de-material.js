
function consultarMaterial(){
    let isFiltro = false;
    let dados = {
        "codigo"        : document.getElementById('id-codigo').value,
        "tipo"          : document.getElementById('id-tipo').value,
        "localizacao"   : document.getElementById('id-local').value,
        "modelo"        : document.getElementById('id-modelo').value,
        "fabricante"    : document.getElementById('id-fabricante').value
        }
    let filtro = {"filtro":'', "valor":''};

    for(let i in dados){
        if(dados[i] !== '' && dados[i] !== null){
            filtro.filtro   = i;
            filtro.valor    = dados[i];
            isFiltro        = true;
            break;
        }
    }
    if(isFiltro){
        comFiltro(filtro);
        isFiltro = false;
    }
    else
        semFiltro();
    limpar();
 }

 async function comFiltro(dado){
    
    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${JSON.stringify(dado)}`);
    const res = await req.json();
    console.log(JSON.stringify(dado));

    exibirLista(res.result, 'Nova Pesquisa');
    }


 async function semFiltro(){
    const req = await fetch('https://apicontroledematerial.onrender.com/api/itens');
    const res = await req.json();
    exibirLista(res.result, 'Nova Pesquisa');
 }

 function limpar(){
    document.getElementById('id-codigo').value      = '';
    document.getElementById('id-tipo').value        = '';
    document.getElementById('id-local').value       = '';
    document.getElementById('id-modelo').value      = '';
    document.getElementById('id-fabricante').value  = '';
 }