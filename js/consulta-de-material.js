console.log('teste')


async function consultarMaterial(){
    const req = await fetch('https://apicontroledematerial.onrender.com/api/itens');
    const res = await req.json();
    console.log(res)
    console.log(res.result)
    console.log(res.result.length)
    exibirLista(res.result);
 }

 function exibirLista(lista){
    var sectionList = document.getElementById("section-exibir-lista");
    sectionList.style.display = 'inline-block';
    for(i in lista){
        sectionList.innerHTML=sectionList.innerHTML + `<div class="linhas">
                <div class="linha">${lista[i].id}</div>
                <div class="linha">${lista[i].codigo}</div>
                <div class="linha">${lista[i].tipo}</div>
                <div class="linha">${lista[i].localizacao}</div>
                <div class="linha">${lista[i].n_serie}</div>
                <div class="linha">${lista[i].modelo}</div>
                <div class="linha">${lista[i].fabricante}</div>
                <div class="linha">${lista[i].descricao}</div>
                <div class="linha">
                    <div class="st">${lista[i].st.st}</div>
                    <div class="st">${lista[i].st.nome}</div>
                    <div class="st">${lista[i].st.matricula}</div>
                    <div class="st">${lista[i].st.destino}</div>
                    <div class="st">${lista[i].st.data}</div>
                </div>
            </div>`
    }

    

 }
    /*for(let i = 0; i<2; i++){
        document.getElementById("id_linha").innerHTML = lista[i].id
        document.getElementById("col-codigo").innerHTML = lista[i].codigo
        document.getElementById("col-tipo").innerHTML = lista[i].tipo
        document.getElementById("col-local").innerHTML = lista[i].localizacao
        document.getElementById("col-serie").innerHTML = lista[i].n_serie
        document.getElementById("col-modelo").innerHTML = lista[i].modelo
        document.getElementById("col-fab").innerHTML = lista[i].fabricante
        document.getElementById("col-desc").innerHTML = lista[i].descricao
        document.getElementById("st-st").innerHTML = lista[i].st.st
        document.getElementById("st-nome").innerHTML = lista[i].st.nome
        document.getElementById("st-mat").innerHTML = lista[i].st.matricula
        document.getElementById("st-dest").innerHTML = lista[i].st.destino
        document.getElementById("st-data").innerHTML = lista[i].st.data
    }*/
    