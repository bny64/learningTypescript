//함수 안으로 타입 단언문 감추기

declare function cacheLast<T extends Function>(fn: T): T;

declare function shallowEqual(a: any, b: any): boolean;

function cacheLast<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;
    return function (...args: any[]) { //타입스크립트는 반환문에 있는 함수와 원본 함수 T타입이 어떤 관련이 있는지 모른다.
        //그러나 결과적으로 원본 함수 T 타입과 동일한 매개변수로 호출되고 반환 값 역시 예상한 결과가 되기 때문에, 타입 단언문을 추가해서 오류를 제거하는 것이 문제가 되지 않는다.
        if (!lastArgs || !shallowEqual(lastArgs, args)) {
            lastResult = fn(...args);
            lastArgs = args;
        }
        return lastResult;
    } as unknown as T;
}

// declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

//객체 매개변수 a,b 가 동일한 키를 가진다는 보장이 없기 때문에 구현할 때 주의해야 한다.
declare function shallowEqual(a: any, b: any): boolean;

function shallowObjectEqual<T extends object>(a: T, b: T): boolean {

    for (const [k, aVal] of Object.entries(a)) {
        if (!(k in b) || aVal !== b[k]) {
            return false;
        }
        return Object.keys(a).length === Object.keys(b).length;
    }
}
//if 구문의 k in b 체크로 b 객체에 k 속성이 있다는 것을 확인했지만 b[k] 부분에서 오류가 발생하는 것이 이상하다.
//실제 오류가 아니라는 것을 알고 있기 때문에 any로 단언하는 수 밖에 없다.

function shallowObjectEqual2<T extends object>(a: T, b: T): boolean {

    for (const [k, aVal] of Object.entries(a)) {
        if (!(k in b) || aVal !== (b as any)[k]) {
            return false;
        }
        return Object.keys(a).length === Object.keys(b).length;
    }
}
//b as any 타입 단언문은 안전하며 (k in b로 체크를 했으므로), 결국 정확한 타입으로 정의되고 제대로 구현된 함수가 된다.

//타입 선언문은 일반적으로 타입을 위험하게 만들지만 상황에 따라 필요하기도 하고 현실적인 해결책이 된다.
//사용해야 한다면, 정확한 정의를 가지는 함수 안으로 숨기도록 한다.