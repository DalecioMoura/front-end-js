
async function cadastrarUsuario(){
    let dados = pegaForm();

    let dadosJson = JSON.stringify(dados);

    const req = await fetch('https://apicontroledematerial.onrender.com/api/usuario',{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        body: dadosJson
    });

    const res = await req.json();
    console.log(res.result);
    exibirUsuarios(res.result,'Cadastrar outro usuário');
    reset();
}

function pegaForm(){
    let nome = document.getElementById('id-nome').value;
    let apelido = nome.substring(0, nome.indexOf(' '));
    let dados = {
        "matricula":    document.getElementById('id-matricula').value,
        "nome":         nome,
        "apelido":      apelido,
        "setor":        document.getElementById('id-setor').value

    };

    return dados;
}
function reset(){
    document.getElementById('id-matricula').value = '';
    document.getElementById('id-nome').value = '';
    document.getElementById('id-setor').value = '';
}