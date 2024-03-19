//오버로딩 타입보다는 조건부 타입을 사용하기

//1.
function double(x: number | string): number | string;

//2. 지나치게 구체적이다
function double<T extends number | string>(x: T): T;

//3. 유니온 타입 관련해서 문제가 발생.
function double(x: number): number;
function double(x: string): string;

//가장 좋은 해결책은 조건부 타입을 사용하는 것
function double<T extends number | string>(x: T): T extends string ? string : number;
//위 코드는 제네릭을 사용했던 예제(2)와 유사하지만, 반환 타입이 더 정교하다.
//유니온에 조건부 타입을 적용하면, 조건부 타입의 유니온으로 분리되기 때문에 number|string의 경우에도 동작한다.

function double(x: any) {
    return x + x
}

function f(x: number | string) {
    return double(x);
}

//각각의 오버로딩 타입이 독립적으로 처리되는 반면, 조건부 타입은 타입 체커가 단일 표현식으로 받아들이기 때문에 유니온 문제를 해결할 수 있다.

//오버로딩 타입보다 조건부 타입을 사용하는 것이 좋다.
//조건부 타입은 추가적인 오버로딩 없이 유니온 타입을 지원할 수 있다.