//타입 추론에 문맥이 어떻게 사용되는지 확인하기

type Language = 'JavaScript' | 'TypeScript' | 'Python';

function setLanguage(language: Language) {

}

setLanguage("JavaScript");

let language = 'JavaScript';
// setLanguage(language); //오류...

//타입스크립트는 할당 시점에 타입을 추론한다.
//위 경우에는 string으로 추론했기 때문에 Language 타입으로 할당이 불가능해서 오류가 발생했다.

//1. 타입 선언에서 가능한 값 제한
let language2: Language = 'JavaScript';
setLanguage(language2);

//2. 상수 선언
const language3 = 'JavaScript';
setLanguage(language3);

//튜플 사용시 주의점
function panTo(where: [number, number]) {
}

panTo([10, 20]); //정상
const loc = [10, 20];
// panTo(loc) //오류 => 타입스크립트는 number[]로 추론한다.

//최선의 방법
function panTo2(where: readonly [number, number]) {

}

const loc2 = [10, 20] as const;
panTo2(loc2);
//as const는 문맥 손실과 관련한 문제를 깔끔하게 해결할 수 있지만 타입 정의에 실수가 있다면 오류는 타입 정의가 아니라 호출되는 곳에서 발생한다.

//객체 사용시 주의점
interface GoveredLanguage {
    language: Language;
    organization: string;
}

function complain(language: GoveredLanguage) {

}

const ts = {
    language: 'TypeScript',
    organization: 'MicroSoft'
};

// complain(ts); //오류 => ts 객체에서 language의 타입은 string으로 추론된다.
// 문제를 해결하기 위해서 cons ts: GoveredLanguage 타입 선언을 추가하거나 as const 상수 단언을 사용해 해결한다.

//콜백 사용시 주의점
function callWithRandomNumbers(fn: (n1: number, n2: number) => void) {
    fn(Math.random(), Math.random());
}

callWithRandomNumbers((a, b) => {
    a;
    b;
    console.log(a + b);
});
//noImplicitAny가 발생한다고 하는데 현재는 타입 추론이 잘되고 있어서 최신 버전에서는 정상 동작할 수도 있다.
//만약 오류가 발생한다면 매개변수에 타입 구문을 추가해서 해결한다.
const fn = (a: number, b: number) => {
    console.log(a + b);
};
callWithRandomNumbers(fn);

//타입 추론에서 문맥이 어떻게 쓰이는지 주의해서 살펴봐야 한다.
//변수를 뽑아서 별도로 선언했을 때 오류가 발생한다면 타입 선언을 추가해야 한다.
//변수가 정말로 상수라면 상수 단언(as const)을 사용해야 한다. 상수 단언을 사용하면 정의한 곳이 아니라 사용한 곳에서 오류가 발생하므로 주의해야 한다.