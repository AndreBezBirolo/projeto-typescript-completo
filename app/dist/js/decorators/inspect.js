export function Inspect(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`${propertyKey} is running`);
        console.log(`Arguments: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Result: ${JSON.stringify(result)}`);
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=inspect.js.map