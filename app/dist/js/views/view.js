export class View {
    constructor(seletor, escapar) {
        this.escapar = false;
        const elemento = document.getElementById(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não encontrado!`);
        }
        if (escapar)
            this.escapar = escapar;
    }
    update(model) {
        let template = this.template(model);
        if (this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        }
        this.elemento.innerHTML = template;
        const t2 = performance.now();
    }
}
