
async function excluirMaterial(){
    let codigo = document.getElementById('id-codigo').value;

    let filtro = {"filtro":"codigo", "valor":codigo};
    let filtroJSON = JSON.stringify(filtro);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${filtroJSON}`,{//https://apicontroledematerial.onrender.com
         method: "DELETE",
         headers:{"Content-Type": "application/json"},
      });

    const res = await req.json();
    console.log('resposta: '+res);

    //exibirLista(res.result, 'Devolver outro ítem');
}