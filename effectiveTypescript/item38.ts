//any 타입은 가능한 좁은 범위에서만 사용하기
type Bar = string;
type Foo = string;

function processBar(b: Bar) {
}

function expressionReturningFoo(f: Foo): Foo {
    return f;
}

function f() {
    const x = expressionReturningFoo('x');
    processBar(x);
}

//위 오류를 제거할 수 있는 방법은 두 가지이다.
//1. 이렇게 하면 안된다. x에 대해 모든 값이 any 타입이 된다.
function f1() {
    const x: any = expressionReturningFoo('x');
    processBar(x);
}
//2. 이게 낫다.
function f2() {
    const x = expressionReturningFoo('x');
    processBar(x as any);
}

//위 함수가 x를 반환한다면 문제가 커진다.
//위 함수를 사용하는 곳에서 f1 함수 같은 경우 any 타입으로 반환되기 때문이다.
//따라서 가능하면 함수의 반환타입을 추론할 수 있는 경우 함수의 반환타입은 명시하는 것이 좋다.
//@ts-ignore을 사용하면 오류가 무시되지만 근본적인 문제는 해결되지 않기 때문에 원인을 찾아 대처하는게 바람직하다.

//1.
// const config: Config = {
//     a: 1,
//     b: 2,
//     c: {
//         key: value
//     }
// } as any

//2.
// const config: Config = {
//     a: 1,
//     b: 2,
//     c: {
//         key: value as any
//     }
// }
// 1번보다 2번이 낫다.

//의도치 않은 타입 안전성의 손실을 피하기 위해 any의 사용 범위를 최소한으로 좁혀야 한다.
//함수의 반환타입이 any인 경우 타입 안정성이 나빠진다. any 타입의 반환은 절대 안된다.
//강제로 오류를 제거하려면 any대신 @ts-ignore 사용하는 것이 좋다.