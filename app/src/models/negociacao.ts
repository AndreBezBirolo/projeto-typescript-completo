import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao implements Imprimivel {

    constructor(
        private _data: Date, 
        public quantidade: number,
        public valor: number
        ) {
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    public paraTexto (): string {
        return `
            Data: ${this._data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}
            Volume: ${this.volume}
            `
    }

    get volume(): number {
        return this.quantidade * this.valor
    }

    public static criaDe(dateString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp = /-/g;
        const date = new Date(dateString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(
            date,
            quantidade,
            valor
        );
    }

    
    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}