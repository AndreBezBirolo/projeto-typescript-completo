import { NegociacaoAPI } from './../interfaces/negociacao-api.js';
import { NegociacoesView } from './../views/negociacoes-view.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from "../models/negociacao.js";
import { MensagemView } from '../views/mensagem-view.js';
import { DiaDaSemana } from '../enums/dias-da-semana.js';
import { LogarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { domInject } from '../decorators/dom-injector.js';

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
        this.atualizaView();
        this.limparForm();
    }

    public importaDados(): void {
        let data = fetch('http://localhost:8080/dados');
        data
        .then(res => res.json())
        .then((dados: NegociacaoAPI[] ) => {
            dados.forEach(dado => {
                this.negociacoes.adiciona(new Negociacao(
                    new Date(),
                    dado.vezes,
                    dado.montante,
                ));
            });
            this.negociacoesView.update(this.negociacoes);
        });
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