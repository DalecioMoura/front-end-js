let habilitaExcluir = false;
let id = '';

document.getElementById('tr-nome').style.display = 'none';
document.getElementById('tr-setor').style.display = 'none';
document.getElementById('tr-email').style.display = 'none';

function excluirUsuario(){
    
    if(isLogado == 'true'){
        let matricula = document.getElementById('id-matricula').value;

        let filtro = {"filtro":"matricula", "valor":matricula};
        
        if(matricula){
            console.log('matricula: '+ matricula);
            if(!habilitaExcluir){
                buscarUsuario(filtro)
            }else
                excluir();
        }
        else
            console.log('digite algo válido!');
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }
}

async function buscarUsuario(filtro){
    let filtroJson = JSON.stringify(filtro);

    const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${filtroJson}`);
    const res = await req.json();

    let usuario = res.result[0];

    document.getElementById('tr-nome').style.display = '';
    document.getElementById('tr-setor').style.display = '';
    document.getElementById('tr-email').style.display = '';

    id = usuario.id;

    document.getElementById('id-matricula').value   = usuario.matricula;
    document.getElementById('id-nome').value        = usuario.nome;
    document.getElementById('id-setor').value       = usuario.setor;
    document.getElementById('id-email').value       = usuario.email;

    document.getElementById('id-input-enviar').value = 'Excluir';

    habilitaExcluir = true;
}

async function excluir(){
    
    if(id){
        const req = await fetch(`https://apicontroledematerial.onrender.com/api/usuario/${id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json"}
        });
      
        reset();

        const res = await req.json()

    }
    else{
        console.log("Não foi possível execultar a operação!")
    }
    
    habilitaExcluir = false;  
}

function reset(){

    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    document.getElementById('id-email').value       = '';
        
    document.getElementById('tr-nome').style.display    = 'none';
    document.getElementById('tr-setor').style.display   = 'none';
    document.getElementById('tr-email').style.display   = 'none';
    document.getElementById('id-input-enviar').value    = 'Buscar';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = 'Usuário excluído com sucesso!'
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