
let matriculaBd = sessionStorage.matricula;
let nomeBd      = sessionStorage.nome;
let setorBd     = sessionStorage.setor;
let isLogado    = sessionStorage.logado;
let apelidoBd   = sessionStorage.apelido;

if(isLogado == 'true'){
    usuarioJaLogado();
}
else{
    usuarioNaoLogado();
}

async function fazerLogin(){
    let matricula = document.getElementById('id-matricula').value;
    let nome = document.getElementById('id-nome').value;

    let filtro = {"filtro":'', "valor":''};

    if(matricula){
        filtro.filtro = "matricula";
        filtro.valor = matricula;
        await buscaDados(filtro);
        if(matricula === matriculaBd){
            usuario = nomeBd;
            isLogado = true;
            console.log('Login efetuado com sucesso!')
        }
            
    }else if(nome){
        filtro.filtro = "nome";
        filtro.valor = nome;
        await buscaDados(filtro);
        if(nome == nomeBd){
            usuario = nomeBd;
            isLogado = true;
            console.log('Login efetuado com sucesso!');
        }
    }else{
        console.log('Entre com o se nome de usuário ou com sua matrícula!')
    }
}

async function buscaDados(filtro){
    let filtroJson = JSON.stringify(filtro);
    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${filtroJson}`);
    const res = await req.json();
    
    console.log(res.result[0]);

    matriculaBd = res.result[0].matricula;
    nomeBd      = res.result[0].nome;
    apelidoBd   = res.result[0].apelido;
    setorBd     = res.result[0].setor;

    sessionStorage.logado       = true;
    sessionStorage.nome         = nomeBd;
    sessionStorage.apelido      = apelidoBd;
    sessionStorage.matricula    = matriculaBd;
    sessionStorage.setor        = setorBd;

    usuarioJaLogado();

    document.getElementById('id-matricula').value = '';
    document.getElementById('id-nome').value = '';
}

function loginLogout(){
    if(isLogado == 'true' || sessionStorage.logado == 'true'){
        if(confirm("Deseja Sair?")){
            isLogado = false;
            sessionStorage.logado = false;

            matriculaBd ='';
            nomeBd      = '';
            apelidoBd   = '';
            setorBd     = '';

            sessionStorage.matricula    = '';
            sessionStorage.nome         = '';
            sessionStorage.apelido      = '';
            sessionStorage.setor        = '';
            
            usuarioNaoLogado();
        }
    }
    else{
        if(window.location == sessionStorage.rotaIndex)
            alert("Entre com suas informações no formulário abaixo!");
        else{
            window.location.href = '../index.html';           
        }  
    } 
}

function usuarioJaLogado(){
    console.log('usuáruio logado: '+isLogado);
    document.getElementById('id-nome-usuario').style.display = '';
    document.getElementById('id-login-usuario').innerHTML = 'SAIR';
    document.getElementById('id-info').innerHTML = 'USUÁRIO:';
    document.getElementById('header-nome').innerHTML = nomeBd;
    document.getElementById('header-matricula').innerHTML = matriculaBd;
    document.getElementById('header-setor').innerHTML = setorBd;
}

function usuarioNaoLogado(){
    console.log('usuáruio logado: '+isLogado);
    document.getElementById('id-nome-usuario').style.display = 'none';
    document.getElementById('id-login-usuario').innerHTML = 'Entrar';
    document.getElementById('id-info').innerHTML = '';
    document.getElementById('header-nome').innerHTML = '';
    document.getElementById('header-matricula').innerHTML = '';
    document.getElementById('header-setor').innerHTML = '';

}