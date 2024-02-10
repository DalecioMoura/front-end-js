
async function retirarMaterial(){
    const dados = {
        "st":"Indisponível",
        "nome":"Dalecio",
        "matricula":"268643",
        "destino":document.getElementById('id-destino').value,
        "data":"01/01/2024"
    }
    console.log(JSON.stringify(dados))
}