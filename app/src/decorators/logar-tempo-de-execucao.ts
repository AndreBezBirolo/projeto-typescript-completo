export function LogarTempoDeExecucao() {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor) {
            const metodoOriginal = descriptor.value;

            descriptor.value = function (...args: any[]) {
                const t1 = performance.now();
                const resultado = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(`O método ${propertyKey} demorou ${(t2 - t1) / 1000} segundos.`);
                return resultado;
            };
            return descriptor;
    }

}