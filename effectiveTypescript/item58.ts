//모던 자바스크립트로 작성하기

//옛날 버전의 자바스크립트 코드를 최신 버전의 자바스크립트로 바꾸는 작업은 타입스크립트로 전환하는 작업의 일부로 볼 수 있다.
//타입스크립트를 도입할 때 가장 중요한 기능은 ECMAScript 모듈과 ES2015 클래스다.

//ECMAScript 모듈 사용하기
//ES2015부터는 import와 export를 사용하는 ECMAScrit모듈이 표준이 되었다.
//프로젝트 종류에 따라 웹팩이나 ts-node 같은 도구가 필요한 경우가 있다.

//CommonJS모듈
//a.js
const b = require('./b');
console.log(b.name);
//b.js
module.exports = {name};

//ECMAScript module
//a.ts
import * as b from './b';

console.log(b.name);
//b.ts
export const name = 'Module B';

//프로토 타입 대신 클래스 사용하기
function Person(first, last) {
    this.first = first;
    this.last = last;
}

Person.prototype.getName = function () {
    return this.first + ' ' + this.last;
};

// =>
class Person {
    first: string;
    last: string;

    constructor(first: string, last: string) {
        this.first = first;
        this.last = last;
    }

    getName() {
        return this.first + ' ' + this.last;
    }
}

//var대신 let/const 사용하기
//let과 const는 제대로 된 블록 스코프 규칙을 가지며, 개발자들이 일반적으로 기대하는 방식으로 동작한다.

//for(;;)대신 for-of 또는 배열 메서드 사용하기
//for-of 루프는 코드가 짧고 인덱스 변수를 사용하지도 않기 때문에 실수를 줄일 수 있다.
//for-in 문법도 존재하지만 몇 가지 문제점이 있기 때문에 사용하지 않는 것이 좋다.

//함수 표현식보다 화살표 함수 사용하기
//this 키워드는 일반적인 변수들과는 다른 스코프 규칙을 가지기 때문에 자바스크립트에서 가장 어려운 개념 중 하나이다.
class Foo {
    method() {
        console.log(this);
        [1, 2].forEach(function (i) {
            console.log(this);
            //strict 모드에서 Foo, undefined, undefined;
            //non-strict 모드에서 Foo, window, window (!);
        });
        //화살표 함수를 사용하면 스코프를 유지할 수 있다.
        [1, 2].forEach((i) => {
            console.log(this);
            //항상 Foo
        });
    }
}

//단축 객체 표현과 구조분해할당 사용하기
const props = obj.props;
const a = props.a;
const b = props.b;

//극단적으로 다음처럼 줄일 수 있다.
const {props: {a, b}} = obj;
//a,b는 변수지만 props는 변수 선언이 아니다.
//기본값도 지정할 수 있다.
const {a = 'default'} = obj.props;

//함수 매개변수 기본값 사용하기
function parseNum(str, base = 10) {
}

//매개변수에 기본값을 지정하면 코드도 간결해지고 base가 선택적 매개변수라는 것을 명확히 나타내는 효과가 있다.

//저수준 promise나 콜백 대신 async/await 사용하기

//연관 배열에 객체 대신 Map과 Set 사용하기
//인덱스 시그니처는 편리하지만 몇 가지 문제점이 있다.
function countWords(text: string) {
    const counts: { [word: string]: number } = {};
    for (const word of text.split(/[\s,.]+/)) {
        counts[word] = 1 + (counts[word] || 0);
    }
}
//'Object have a constructor'라는 특정 문자열이 주어지면 문제가 발생한다.
// {
//     objects : 1,
//     have : 1,
//     a : 1,
//     constructor: "1function Obejct(){[native code]}"
// }

//타입스크립트에 use strict 넣지 않기
//타입스크립트에서 훨씬 더 엄격하게 체크하기 때문에 'use strict'는 무의미하다.
//tsconfig.json에서 alwaysStrict 또는 strict 컴파일러 옵션을 설정하면, 엄격 모드로 코드르 파싱한다.

//타입스크립트 개발 환경은 모던 자바스크립트도 실행할 수 있으므로 모던 자바스크립트의 최신 기능들을 적극적으로 활용해야 한다.
//코드 품질을 향상시킬 수 있고, 타입스크립트의 타입 추론도 더 나아진다.
//타입스크립트 개발 환경에서는 컴파일러와 언어 서비스를 통해 클래스, 구조 분해, async/await 같은 기능을 쉽게 배울 수 있다.
//'use strict'는 타입스크립트 컴파일러 수준에서 사용되므로 코드에서 제거해야 한다.