export class Negociacao {

    constructor(
        private _data: Date, 
        private quantidade: number,
        private valor: number
        ) {
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data;
    }

    get volume(): number {
        return this.quantidade * this.valor
    }
}