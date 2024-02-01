// 변경 관련된 오류 방지를 위해 readonly 사용하기

//readonly number[], number[] 차이
//1. 배열의 요소를 읽을 수 있지만, 쓸 수는 없다.
//2. length를 읽을 수 있지만, 바꿀 수는 없다.
//3. 배열을 변경하는 pop을 비롯한 함수는 호출할 수 없다.

interface Outer {
  inner: {
    x: number;
  };
}

const o: Readonly<Outer> = { inner: { x: 0 } };
// o.inner = { x: 1 }; //읽기 전용 속성이므로 'inner'에 할당할 수 없습니다.

type T = Readonly<Outer>;
// type T = {
//   readonly inner: {
//       x: number;
//   };
// }

//deep readonly를 사용하려면 ts-essentials에 있는 DeepReadonly를 사용하는게 좋다.