import { NegociacoesView } from './../views/negociacoes-view.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from "../models/negociacao.js";
import { MensagemView } from '../views/mensagem-view.js';
import { DiaDaSemana } from '../enums/dias-da-semana.js';
import { LogarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { domInject } from '../decorators/dom-injector.js';
import { NegociacoesService } from '../services/negociacoes-service.js';
import { imprimir } from '../utils/imprimir.js';

export class NegociacaoController {
    @domInject('#data')
    private inputData: HTMLInputElement;
    @domInject('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInject('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('negociacoesView');
    private mensagemView = new MensagemView('mensagemView');
    private negociacaoService = new NegociacoesService;

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @LogarTempoDeExecucao()
    adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update('Apenas negociações em dias úteis são aceitas!');
            return;
        } 
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.atualizaView();
        this.limparForm();
    }

    public importaDados(): void {
        this.negociacaoService
        .obterNegociacoes()
        .then(negociacoes => {
            return negociacoes.filter(negociacao => {
                return !this.negociacoes
                    .lista()
                    .some(
                        negociacaoExistente => negociacao.ehIgual(negociacaoExistente)
                    );
            })
        })
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this.negociacoes.adiciona(negociacao));
            this.negociacoesView.update(this.negociacoes);
        })
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação cadastrada com sucesso!');
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.DOMINGO && data.getDay() != DiaDaSemana.SABADO;
    }

    limparForm(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

}