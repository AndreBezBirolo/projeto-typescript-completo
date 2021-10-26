var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NegociacoesView } from './../views/negociacoes-view.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from "../models/negociacao.js";
import { MensagemView } from '../views/mensagem-view.js';
import { DiaDaSemana } from '../enums/dias-da-semana.js';
import { LogarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { domInject } from '../decorators/dom-injector.js';
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('negociacoesView');
        this.mensagemView = new MensagemView('mensagemView');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas!');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limparForm();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação cadastrada com sucesso!');
    }
    ehDiaUtil(data) {
        return data.getDay() != DiaDaSemana.DOMINGO && data.getDay() != DiaDaSemana.SABADO;
    }
    limparForm() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
}
__decorate([
    domInject('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInject('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInject('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    LogarTempoDeExecucao()
], NegociacaoController.prototype, "adiciona", null);
