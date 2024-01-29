
async function cadastarMaterial(){
   const req = await fetch('https://apicontroledematerial.onrender.com/api/itens');
   const res = await req.json();
   console.log(res.result)
   
   let dados = pegaForm();
   let isExistent = compara(res.result, dados.codigo)
   if(isExistent)
      console.log('O código digitado já está vinculado a um produto.\nDigite um código diferente.');
   else{
      let dadosJSON = JSON.stringify(dados);
      const req = await fetch('https://apicontroledematerial.onrender.com/api/item',{
         method: "POST",
         headers:{"Content-Type": "application/json"},
         body:dadosJSON
      });
      const res = await req.json();
      console.log('resulatdo da inclusão:');
      console.log(res);
      exibirLista(res.result, 'Cadastrar outro ítem');
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

/*function exibirLista(){
   let sectioExibirLista = document.getElementById('section-exibir-lista');
   sectioExibirLista.style.display = 'inline-block';

   let divPricipal = document.createElement('div');
   divPricipal.setAttribute('id', 'exibir-lista-div-principal');

   let divButton = document.createElement('div');
   divButton.setAttribute('id', 'div-button');

   let btn = document.createElement('button');
   btn.setAttribute('id', 'btn-nova-pesquisa');
   btn.setAttribute('onclick', 'novoCadastro()');
   btn.appendChild(document.createTextNode('Cadastrar outro ítem'));

   divButton.appendChild(btn);

   let titulo = document.createElement('h2');
   titulo.appendChild(document.createTextNode('Lista de Material'));


}*/

