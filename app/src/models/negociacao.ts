import { Imprimivel } from "../utils/imprimivel.js";

export class Negociacao extends Imprimivel {

    constructor(
        private _data: Date, 
        public quantidade: number,
        public valor: number
        ) {
        super();
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
}