async function excluirMaterial(){
    let filtro = {"filtro":"codigo", "valor":document.getElementById('id-codigo').value};
    
    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${JSON.stringify(filtro)}`,{
        method: "DELETE",
        headers:{"content-type": "application/json"}
    });

    const res = await req.json();
    console.log(res);
    console.log('Ítem excluído com sucesso!');
    
}