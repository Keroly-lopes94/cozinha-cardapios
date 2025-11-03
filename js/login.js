import { mostraMsg } from "./util.js";
import { loginCozinheira } from "./api.js";

document.getElementById("formLogin").addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  if (!email || !senha) {
    mostraMsg('Por favor,verifique email e senha.', red);
    return
  }

  const botao = document.getElementById('acessar');
  botao.disabled = true;
  botao.textContent = 'Carregando...';
  const { sucesso, msg, user } = await loginCozinheira(email, senha);
  botao.disabled = false;
  botao.textContent = 'Acessar';

  if (sucesso) {
    mostraMsg(`Bem Vindo, ${user.name}`, "green");
    setTimeout(() => {
      window.location.href = "sistema.html"
    }, 1500);
  } else {
    mostraMsg(msg || "Falha ao fazer login.Verifique email e senha.", "red")
  }
});