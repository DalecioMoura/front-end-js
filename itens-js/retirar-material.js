
async function retirarMaterial(){
    let codigo = document.getElementById('id-codigo').value;
    let destino = document.getElementById('id-destino').value;
    let data = new Date().toLocaleDateString();

    let filtro = {"filtro":"codigo", "valor":codigo};
    let dados = {
        "st":"Indisponível",
        "nome":"Dalecio",
        "matricula":"268643",
        "destino":destino,
        "data":data
    };
    let dadosJSON = JSON.stringify({"status":dados});
    let filtroJSON = JSON.stringify(filtro)
    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${filtroJSON}`,{//https://apicontroledematerial.onrender.com
         method: "PATCH",
         headers:{"Content-Type": "application/json"},
         body:dadosJSON
      });

    const res = await req.json();
    console.log(res);

    exibirLista(res.result, 'Devolver outro ítem');
}