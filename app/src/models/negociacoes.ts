import { Imprimivel } from '../utils/imprimivil.js';
import { Negociacao } from './negociacao.js';

export class Negociacoes extends Imprimivel {
    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes, null, 2);
    }
}