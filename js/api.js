const API_USUARIOS = "https://api-storage-cantina-main-fawn.vercel.app/";
async function  tratarErroResponse(res,msgPadrao) {
   const textErro= await res.text();
   let mesgErro;
   try{
    const errorData= JSON.parse(textErro);
    msgErro= errorData.msg||errorData.error||errorData.message||textErro;
   }catch{
    msgErro= textErro;
   }
   return{sucessso:false,msg:msgErro||msgPadrao|| "Erro desconhecido na API",};
}

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
        const res= await fetch(API_USUARIOS);
        
    } catch (error) {
        console.error("Erro ao cadastrar cardápio",error);
        alert("Ocorreu um erro ao cadastrar cardápio");
    }
}

export async function alterarCardapio(id) {
    try {
        const res= await fetch(API_USUARIOS);
        const cardapios= await res.json();
        
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