export function Escape(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    let returnValue = originalMethod.apply(this, args);
    if(typeof returnValue === 'string') {
      return returnValue.replace(/<script>[\s\S]*?<\/script>/g, '');
    };
  };
  return descriptor;
}