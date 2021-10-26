import { Inspect } from "../decorators/inspect.js";

export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.getElementById(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não encontrado!`);
        }
    }

    protected abstract template(model: T): string;

    @Inspect
    update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}