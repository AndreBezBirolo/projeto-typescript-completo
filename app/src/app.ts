import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if(form) {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        controller.adiciona();
    })
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o formulário existe.');
}

const botaoImporta = document.querySelector('#botao-importa');
if(botaoImporta) { 
    botaoImporta.addEventListener('click', (e: Event) => {
        e.preventDefault();
        controller.importaDados();
    })
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o botão de importação existe.');
}