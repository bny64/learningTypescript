//매팽된 타입을 사용하여 값을 동기화하기

interface ScatterProps {
  xs: number[];
  ys: number[];

  //Display
  xRange: [number, number];
  yRange: [number, number];
  color: string;

  //Events
  onClick: (x: number, y: number, index: number) => void;
}

// function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
//   let k: keyof ScatterProps;
//   for (k in oldProps) {
//     if (oldProps[k] !== newProps[k]) {
//       if (k !== "onClick") return true;
//     }
//   }
//   return false;
// }
//새로운 속성이 추가되면 shouldUpdate 함수는 값이 변경될 때 마다 차트를 다시 그린다.
//타입 체커가 동작하도록 개선이 필요핟.
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
  return false;
}

//나중에 새로운 속성을 추가하는 경우에 속성이 추가되면 REQUIRES_UPDATE에서 에러가 발생할 것이다.

//매핑된 타입을 사용해서 관련된 값과 타입을 동기화하도록 한다.
//인터페이스에 새로운 속성을 추가할 때, 선택을 강제하도록 매핑된 타입을 고려해야 한다.