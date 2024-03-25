//객체를 순회하는 노하우

const obj = {
    one: 'uno',
    two: 'dos',
    three: 'tres'
}
// for (const k in obj) {
//     const v = obj[k];
// }

let k: keyof typeof obj;
for (k in obj) {
    const v = obj[k];
}
//k의 타입을 구체적으로 명시해줘야 한다.

interface ABC {
    a: string;
    b: string;
    c: number;
}

// function foo(abc: ABC) {
//     for (const k in abc) {
//         const v = abc[k];
//     }
// }
//foo함수는 a,b,c 속성 외에 d를 가지는 x 객체로 호출이 가능하다.
//foo함수는 ABC 타입에 '할당 가능한' 어떠한 값이든 매개변수로 허용되기 때문이다.

function foo(abc: ABC) {
    let k: keyof ABC;
    for (k in abc) {
        const v = abc[k];
    }
}

//keyof 키워드를 사용한 방법은 문제점을 내포하고 있다.
//k가 "a" | "b" | "c" 타입으로 한정되어 문제가 된 것처럼, v도 string | number 타입으로 한정되어 범위가 너무 좁아 문제가 된다.
//d: new Date()가 있는 이전 예제처럼, d속성은 Date 타입뿐만 아니라 어떠한 타입이든 될 수 있기 때문에 v가 string | number 타입으로 추론된 것은 잘못이고 런타임의 동작을 예상하기 어렵다.
//골치 아픈 타입 문제 없이, 객체의 키와 값을 순회하고 싶다면 Object.entries를 사용하면 된다.
function foo(abc: ABC) {
    for (const [k, v] of Object.entries(abc)) {

    }
}
//프로토타입 오염의 가능성을 염두해 둬야 한다.
//for in을 사용하면 객체의 정의에 없는 속성이 등장할 수도 있다.
//객체를 순회하며 키와 값을 얻으려면, (let k: keyof T) 같은 keyof 선언이나 Object.entries를 사용하면 된다.
//keyof : 상수이거나 추가적인 키없이 정확한 타입을 원하는 경우
//Object.entries : 일반적으로 쓰이지만 키와 값의 타입을 다루기 까다로움

//객체를 순회할 때, 키가 어떤 타입인지 정확히 파악하고 있다면 let k: keyof T와 for-in 루프를 사용한다.
//함수의 매개변수로 쓰이는 객체에는 추가적인 키가 존재할 수 있다는 것을 명심한다.
//객체를 순회하며 키와 값을 얻는 가장 일반적인 방법은 Object.entries를 사용하는 것이다.