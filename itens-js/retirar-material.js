
async function retirarMaterial(){

    if(isLogado == 'true'){

        let codigo = document.getElementById('id-codigo').value;
        let destino = document.getElementById('id-destino').value;
        let data = new Date().toLocaleDateString();

        let filtro = {"filtro":"codigo", "valor":codigo};
        let dados = {
            "st":"Indisponível",
            "nome":apelidoBd,
            "matricula":matriculaBd,
            "destino":destino,
            "data":data
        };

        let dadosJSON = JSON.stringify({"status":dados});
        let filtroJSON = JSON.stringify(filtro);

        const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${filtroJSON}`,{
            method: "PATCH",
            headers:{"Content-Type": "application/json"},
            body:dadosJSON
        });

        const res = await req.json();
        console.log(res);

        exibirLista(res.result, 'Devolver outro ítem');
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }   
}