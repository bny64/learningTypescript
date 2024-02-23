//string타입보다 더 구체적인 타입 사용하기

type RecordingType = 'studio' | 'live';

interface Album {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
}

//타입 시그니처가 정밀하지 못하다.
function pluck(records, key) {
    return records.map(r => r[key]);
}

function pluck2<T>(records: T[], key: keyof T) {
    return records.map(r => r[key]);
}

//T[keyof T]는 개체 내의 가능한 모든 값의 타입이다.
//key의 값으로 하나의 문자열을 넣게 되면, 그 범위가 너무 넓어서 적절한 타입이라고 보기 어렵다.

//타입시그니처가 완벽하게 됐다.
function pluck3<T, K extends keyof T>(records: T[], key: K): T[K][] {
    return records.map(r => r[key]);
}

//string은 any와 비슷한 문제를 가지고 있다. 잘못 사용하게되면 무효한 값을 허용하게 되고 타입 간의 관계도 감추어 버린다.

//문자열을 남발하여 선언된 코드는 피한다. 모든 문자열을 할당할 수 있는 string타입보다 더 구체적인 타입을 사용하는 것이 좋다.
//변수의 범위를 보다 구체적으로 표현하고 싶다면 문자열 리터럴 타입의 유니온을 사용한다.
//객체의 속성 이름을 함수 매개변수로 받을 때 string보다 keyof T를 사용하는 것이 좋다.