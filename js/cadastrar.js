import { mostraMsg } from "./util.js";
import { cadastrarCozinheira } from "./api.js";

document.getElementById("formCadastrar").addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const confirmarSenha = document.getElementById('confrimar').value.trim();
    if (!nome || !email || !senha || !confirmarSenha) {
        mostraMsg('Por favor,preencha todos os campos.', red);
        return;
    }

    if (senha !== confirmarSenha) {
        mostraMsg('As senhas não conferem.', red);
        return;
    }

    const botao = document.getElementById('cadastrar');
    botao.disabled = true;
    botao.textContent = 'Cadastrando...';
    const { sucesso, msg, } = await cadastrarCozinheira(email, senha, nome);
    botao.disabled = false;
    botao.textContent = 'Cadastra-se';

    if (sucesso) {
        mostraMsg(`Cadastro realizado com sucesso!`, "green");
        setTimeout(() => {
            window.location.href = "sistema.html"
        }, 1500);
    } else {
        mostraMsg(msg, "red");
    }

});