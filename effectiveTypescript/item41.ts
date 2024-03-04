//any의 진화를 이해하기

//타입스크립트에서 일반적으로 변수의 타입은 선언할 때 결정된다.
//하지만 any 타입과 관련해서 예외인 경우가 존재한다.

function range(start: number, limit: number) {
    const out = [];
    for (let i = start; i < limit; i++) {
        out.push(i);
    }
    return out;
}

//out 타입이 처음에는 any 타입 배열인 []로 초기화되었는데 마지막에는 number[]로 추론된다.
//out 타입은 any[]로 선언되었지만 number 타입의 값을 넣는 순간부터 number[]로 진화한다.
//배열의 다양한 요소를 넣으면 배열의 타입이 확장되며 진화한다.
//또한 조건문에서는 분기에 따라 타입이 변할 수도 있다.
//변수의 초깃값이 null인 경우도 any의 진화가 일어난다. 보통 try/catch 구문에서 일어난다.
//any의 진화는 noImplicitAny가 설정된 상태에서 변수의 타입이 암시적인 경우 일어난다.
let val: any; //이렇게 명시적으로 선언하면 일어나지 않는다.

//어떤 변수가 암시적 any 상태일 때 값을 읽으려고 하면 오류가 발생한다.
//암시적 any 타입은 함수 호출을 거쳐도 아래의 함수처럼 진화하지 않는다.
function makeSquares(start: number, limit: number) {
    let out = [];
    range(start, limit).forEach(i => {
        out.push(i * i);
    })
    //아래처럼 단일 구문으로 배열을 생성하여 any 전체를 진화시키는 방법을 생각해야 한다.
    // out = range(start, limit);

    return out;

}

//일반적인 타입들은 정제가 되지만 암시적 any, any[] 타입은 진화할 수 있다.
//이러한 동작이 발생하는 코드를 인지하고 이해할 수 있어야 한다.
//any를 진화시키는 것보다 명시적 타입 구문을 사용하는 것이 안전하다.