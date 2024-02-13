
async function cadastarMaterial(){

   if(isLogado == 'true'){

      let dados = pegaForm();

      let filtro = {"filtro":Object.keys(dados)[0], "valor":dados.codigo};

      const req = await fetch(`https://apicontroledematerial.onrender.com/api/item/${JSON.stringify(filtro)}`);
      const res = await req.json();

      let isExistent = compara(res.result, dados.codigo);

      if(isExistent)
         console.log('Usuário já cadastrado!.\nDigite um código diferente.');
      else{
         let dadosJSON = JSON.stringify(dados);

         const req = await fetch('https://apicontroledematerial.onrender.com/api/item',{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body:dadosJSON
         });

         const res = await req.json();

         exibirUsuarios(res.result, 'Cadastrar outro ítem');
      }
   }
   else{
       if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
           window.location.href = '../index.html';
   }
}

function pegaForm(){

   const dados = {
      "codigo":      document.getElementById('id-codigo').value,
      "tipo":        document.getElementById('id-tipo').value,
      "localizacao":       document.getElementById('id-local').value,
      "n_serie":       document.getElementById('id-serie').value,
      "modelo":      document.getElementById('id-modelo').value,
      "fabricante":  document.getElementById('id-fabricante').value,
      "descricao":   document.getElementById('id-descricao').value,
      "status":{"st":"Disponível", "nome":"", "matricula":"", "destino":"", "data":""}
   }
   return dados
}

function compara(resResult, dadosCodigo){
   let resultado = false
   for(let i in resResult){
      console.log('Banco: '+resResult[i].codigo)
      console.log('Digitado: '+dadosCodigo)
      if(resResult[i].codigo == dadosCodigo){
         resultado = true;
         break;
      }    
   }
   return resultado;
}

