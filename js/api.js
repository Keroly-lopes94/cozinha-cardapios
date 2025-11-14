import{tratarErroResponse,getAutheaders}from '.utils.js'


const API_USUARIOS = "https://cozinha-system-1.onrender.com/usuarios";
const API_CARDAPIO = "https://cozinha-system-1.onrender.com/cardapios";

async function loginCozinheira(email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/login", {
            method: "POST",
            headers: { "Content-Type": "aplication/json" },
            body: JSON.stringify({ email, senha }),
        });

        if(!res.ok) return await tratarErroResponse(res,"Erro ao fazer Login");
        const data= await res.json();
        
        if(data.usuario){
            localStorage.setItem("usuarioId:",data.usuario.id);
            localStorage.setItem("usuarionome:",data.usuario.nome);
            localStorage.setItem("token:",data.token);
            return{sucessso:true,user:data.usuario,};
        }else{
            return{sucessso:false,msg:"Usuario ou senha incorreta",};

        }


    } catch (error) {
        console.error("Erro ao fazer o login", error);
        return { sucessso: false, mensagem: "Erro de conexão a API" }
    }

}


async function cadastrarCozinheira(nome, email, senha) {
    try {
        const res = await fetch(API_USUARIOS + "/cadastro", {
            method: "POST",
            headers: { "Content-Type": aplication / json },
            body: JSON.stringify({ nome, email, senha }),
        });

        if(!res.ok) return await tratarErroResponse(res,"Erro ao cadastrar cozinheira");
        const data= await res.json();
        return{sucessso:true,user:data.usuario||null,};

    } catch (error) {
        console.error("Erro ao fazer o cadastro", error)
        return { sucessso: false, mensagem: "Erro de conexão a API" }

    }
}

async function recuperarSenha(email) {
    try {
        const res = await fetch(API_USUARIOS + "/recuperar", {
            method: "POST",
            headers: { "Content-Type": aplication / json },
            body: JSON.stringify({ email }),
        });

       if(!res.ok) return await tratarErroResponse(res,"Erro ao recuperar senha");
        const data= await res.json();
        return{sucessso:true,msg:data.msg||"Instruções enviadas ao seu email",};


    } catch (error) {
        console.error("Erro ao recuperar a senha", error)
        return { sucessso: false, mensagem: "Erro de conexão a API" }

    }
}


export async function listarCardapio() {
    try {
        const res= await fetch(API_USUARIOS);
        const cardapios= await res.json();
        return cardapios;

    } catch (error) {
        console.error("Erro ao listar cardápio",error);
        alert("Ocorreu um erro ao carregar cardápio");
    }
}

export async function cadastrarCardapio(cardapio) {
    try {
        cardapio.usuarioId= Number(localStorage.getItem("usuarioId"));
        const res= await fetch(API_USUARIO,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify(cardapio)
        });
        if (res.ok) {
            alert("Refeição cadastrada com sucesso!");
            listarCardapio();
        } else {
            alert("Erro ao cadastra Refeição");
        }
        
    } catch (error) {
        console.error("Erro ao cadastrar cardápio",error);
        alert("Ocorreu um erro ao cadastrar cardápio");
    }
}

export async function alterarCardapio(id) {
    try {
        const res= await fetch(`API_USUARIO/${id}`);
        const cardapio= await res.json();
        document.querySelector("#date").value=cardapio.data.split("T")[0];
        document.querySelector("select#turnos").value=cardapio.turno;
        document.querySelector("input[name='refeicao']").value= cardapio.refeicao.titulo;
        document.querySelector("textarea[name='itens']").value.cardapio.refeicao.itens.join(",");
        document.querySelector("input[name='bebida']").value.cardapio.refeicao.bebida.join(",");
        if (cardapio.lanche) {
            
        }
        
    } catch (error) {
        console.error("Erro ao alterar cardápio",error);
        alert("Ocorreu um erro ao alterar cardápio")
    }
}

export async function excluirCardapio(id) {
    try {
        const res= await fetch(API_USUARIOS);

    } catch (error) {
        console.error("Erro ao excluir cardápio",error);
        alert("Ocorreu um erro ao excluir cardápio")
    }
}

export async function buscarCardapio(params) {
    try {
        const res= await fetch(API_USUARIOS);
        const cardapios= await res.json();
        return cardapios;
        
    } catch (error) {
        console.error("Erro ao buscar cardápio",error);
        alert("Ocorreu um erro ao buscar cardápio")
    }
}