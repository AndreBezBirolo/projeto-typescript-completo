export class Negociacao {

    constructor(
        private _data: Date, 
        private quantidade: number,
        private valor: number
        ) {
    }

    get data(): Date {
        return this._data;
    }

    get volume(): number {
        return this.quantidade * this.valor
    }
}