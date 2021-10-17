export default function verifyZeroInteractions(toCheck: Object) {
    const props = [];
    let obj = toCheck;
    do {
        props.push(...Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));
    
    let methods = props.sort().filter((e:(keyof typeof obj), i:any, arr:any[]) => { 
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') {
            expect(toCheck[e]).not.toBeCalled()
       };
    });
    
}
