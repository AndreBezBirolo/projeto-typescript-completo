export function domInject(seletor) {
    return function (target, key) {
        let element;
        const getter = function () {
            if (!element) {
                element = document.querySelector(seletor);
            }
            return element;
        };
        Object.defineProperty(target, key, {
            get: getter,
        });
    };
}
//# sourceMappingURL=dom-injector.js.map