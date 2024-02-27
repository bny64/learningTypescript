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