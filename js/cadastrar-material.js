async function cadastarMaterial(){
   const req = await fetch('https://apicontroledematerial.onrender.com/api/itens');
   const res = await req.json();
   console.log(res)
   console.log(res.result)

   window.location.href=''
}