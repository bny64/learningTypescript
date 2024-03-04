//any를 구체적으로 변형해서 사용하기

//any 타입은 모든 숫자, 문자열, null, undefined 까지도 포함된다.
//일반적으로 구체적인 타입을 찾아 안전성을 높이도록 해야한다.

function getLengthBad(array: any) { //이렇게 하지 말자
    return array.length;
}

function getLength(array: any[]) {
    return array.length;
}

//함수의 매개변수가 객체이긴 하지만 값을 할 수 없다면 {[key: string]: any}처럼 선언하면 된다.
function hasTwelveLetterKey(o: { [key: string]: any }) {
    for (const key in o) {
        if (key.length === 12) {
            return true;
        }
    }
    return true;
}

//앞의 예제처럼 함수의 매개변수가 객체이지만 값을 알 수 없다면 모든 비기본형을 포함하는 object 타입을 사용할 수 있다.
//object 타입은 객체의 키를 열거할 수 있지만 속성에 접근할 수 없다.
//o[key] 이렇게 접근 불가능
//객체지만 속성에 접근할 수 없어야 한다면 unknown 타입이 필요한 상황이다.
//함수의 타입에도 단순히 any를 사용하면 안된다.
//최소한으로나마 구체화 할 수 있는 세 가지 방법이 있다.
type Fn0 = () => any;
type Fn1 = (arg: any) => any;
type FnN = (...args: any[]) => any;

//any를 사용할 때는 정말로 모든 값이 허용되어야만 하는지 면밀히 검토해야 한다.
//any보다 더 정확하게 모델링할 수 있도록 any[] 또는 {[id: string]: any} 또는 () => any 처럼 구체적인 형태로 사용해야 한다.