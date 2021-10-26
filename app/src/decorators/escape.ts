export function Escape(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    let returnValue = originalMethod.apply(this, args);
    if(typeof returnValue === 'string') {
        console.log(`@escape em ação na classe ${this.constructor.name} para o método ${key}`);
      return returnValue.replace(/<script>[\s\S]*?<\/script>/g, '');
    };
  };
  return descriptor;
}