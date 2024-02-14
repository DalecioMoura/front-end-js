
async function excluirMaterial(){

  if(isLogado == 'true'){
    let codigo = document.getElementById('id-codigo').value;

    let filtro = {"filtro":"codigo", "valor":codigo};
    let filtroJSON = JSON.stringify(filtro);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${filtroJSON}`,{
         method: "DELETE",
         headers:{"Content-Type": "application/json"},
      });

    const res = await req.json();
    console.log('resposta: '+res);

    document.getElementById('id-codigo').value = '';

  }
  else{
      if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
          window.location.href = '../index.html';
  }
}