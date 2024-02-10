
async function devolverMaterial(){
    let codigo = document.getElementById('id-codigo').value;

    let filtro = {"filtro":"codigo", "valor":codigo};
    let dados = {
        "st":"Disponível",
        "nome":"",
        "matricula":"",
        "destino":"",
        "data":""
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