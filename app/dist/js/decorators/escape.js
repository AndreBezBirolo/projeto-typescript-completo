export function Escape(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let returnValue = originalMethod.apply(this, args);
        if (typeof returnValue === 'string') {
            return returnValue.replace(/<script>[\s\S]*?<\/script>/g, '');
        }
        ;
    };
    return descriptor;
}
//# sourceMappingURL=escape.js.map