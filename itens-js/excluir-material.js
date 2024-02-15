
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

    exibirMensagem();

  }
  else{
      if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
          window.location.href = '../index.html';
  }
}

function exibirMensagem(){
  document.getElementById('id-codigo').value  = '';

  let msg = document.getElementById('id-msg');
  msg.innerHTML = 'Ítem excluído com sucesso!'
  msg.style.maxWidth = '500px';
  msg.style.textAlign = 'center';
  msg.style.color = 'red';
  msg.style.backgroundColor = 'yellow';
  msg.style.fontWeight = 'bold';
  msg.style.padding = '10px';
  msg.style.margin = '20px auto';
  msg.style.borderRadius = '5px';
  setTimeout(()=>{
      document.getElementById('id-msg').innerHTML = '';
      msg.style.backgroundColor = '';
  }, 5000);
}