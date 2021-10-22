export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(seletor: string) {
        this.elemento = document.getElementById(seletor);
    }

    protected abstract template(model: T): string;

    update(model: T): void {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}