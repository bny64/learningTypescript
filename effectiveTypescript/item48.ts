//API주석에 TSDoc 사용하기

/**
 * 인사말을 생성합니다.
 * @param name 인사할 사람
 * @param title 그 사람의 칭호
 * @returns 사람이 보기 좋은 형태의 인사말
 */
function greet(name: string, title: string) {
    return `Hello ${title} ${name}`;
}

//대부분의 편집기는 JSDoc 스타일의 주석을 툴팁으로 표시해주기 때문에 적극적으로 활용하는 것이 좋다.
//타입스크립트 관점에서는 TSDoc라고 부른다.

//타입 정의에 TSDoc을 사용할 수도 있다.

/** 특정 시간과 장소에서 수행된 측정*/
interface Measurement {
    /** 어디에서 측정되었나? */
    position: Vector3;
    /** 언제 측정되었나? epoch에서부터 초 단위로 */
    time: number;
    /** 측정된 운동량 */
    momentum: Vector3;
}

const m: Measurement = {
    time: (new Date().getTime()) / 1000,
    position: {x: 0, y: 0, z: 0},
    momentum: {x: 1, y: 1, z: 1}
}

//TSDoc 주석은 마크다운 형식으로 꾸며지므로 굵은 글씨, 기울임 글씨, 글머리기호 목록을 사용할 수 있다.

/**
 * 이 __interface__는 **세 가지** 속성을 가진다.
 * 1. x
 * 2. y
 * 3. z
 */
interface Vector3D {
    x: number;
    y: number;
    z: number;
}

//주석을 장황하게 쓰지말고 간단히 요점만 언급한다.
//JSDoc에는 타입 정보를 명시하는 규칙(@param {string} ...)이 있지만, 타입스크립트에서는 타입 정보가 있으므로 타입정보를 명시하면 안된다.

//익스포트된 함수, 클래스, 타입에 주석을 달 때는 JSDoc/TSDoc 형태를 사용합시다.
//JSDoc/TSDoc 형태의 주석을 달면 편집기가 주석 정보를 표시해준다.
//@param, @returns 구문과 문서 서식을 위해 마크다운을 사용할 수 있다.
//주석에 타입 정보를 포함하면 안 된다.