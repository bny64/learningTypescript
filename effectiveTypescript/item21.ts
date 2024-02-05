//타입 넓히기

//상수를 사용해서 변수를 초기화 할 떄 타입을 명시하지 않으면 타입 체커는 타입을 결정해야 한다.
//지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유추해야 한다는 의미
//타입스크립트에서 이런 과정을 "넓히기(widening)" 이라고 한다.

interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: "x" | "y" | "z") {
  return vector[axis];
}

// let x = "x";
const x = "x"; //let에서 const로 변경

let vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x);
//let x = 'x' => string으로 추론되기 때문에 오류 발생
const v = {
  x: 1,
};

v.x = 3;
// v.x = '3'; => 자바스크립트에서는 정상
// v.y = '4'; => 자바스크립트에서는 정상

//타입 추론의 강도 직접 제어
//1. 명시적인 타입 구문 제공
const v1: { x: 1 | 3 | 5 } = { x: 1 };

//2. 타입 체커에 추가적인 문맥 제공 item26

//3. const 단언문 사용
const v3 = {
  x: 1 as const,
  y: 2,
};
// const v3: {
//   x: 1;
//   y: number;
// }

const v3_2 = {
  x: 1,
  y: 2,
} as const;
// const v3_2: {
//   readonly x: 1;
//   readonly y: 2;
// }

//타입스크립트가 넓히기를 통해 상수를 추론하는 법을 이해해야 한다.
//동작에 영향을 줄 수 있는 const, 타입 구문, 문맥, as const에 익숙해져야 한다.
