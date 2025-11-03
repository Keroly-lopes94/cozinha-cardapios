import { mostraMsg } from "./util.js";
import {recuperarSenha} from "./api.js";

document.getElementById("formRecuperar").addEventListener('submit',async(event)=>{
event.preventDefault();
  const email = document.getElementById('email').value.trim();
  
  if (!email) {
    mostraMsg('Por favor,verifique email e senha.', red);
    return
  }

  const botao = document.getElementById('recuperar');
  botao.disabled = true;
  botao.textContent = 'Enviando...';
  const { sucesso, msg } = await recuperarSenha(email);
  botao.disabled = false;
  botao.textContent = 'Recuperar senha...';

  if (sucesso) {
    mostraMsg(msg || `Instrucao de recuperacao enviadas para seu email`, "green");
    
  } else {
    mostraMsg(msg || "Não foi possível enviar email de recuperar.", "red")
  }

});