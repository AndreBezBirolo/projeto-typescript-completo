export class View {
    constructor(seletor) {
        this.elemento = document.getElementById(seletor);
    }
    update(model) {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
