//한꺼번에 객체 생성하기

//타입은 일반적으로 변경되지 않는다.
//객체를 생성할 때는 속성을 하나씩 추가하기보다는 여러 속성을 포함해서 한꺼번에 생성해야 한다.
interface Point {
  x: number;
  y: number;
}

const pt: Point = {
  x: 1,
  y: 2,
};
//위 처럼 한 번에 만드는 게 좋다.

//작은 객체들을 조합해서 큰 객체를 만들어야 하는 경우에도 여러 단계를 거치는 것은 좋지 않다.
const pt2 = { x: 3, y: 4 };
const id = { name: "Pythagoras" };
const namedPoint = {};
Object.assign(namedPoint, pt, id);
// namedPoint.name; //{} 형식에 'name' 속성이 없습니다.

//객체 전개 연산자 ... 사용해서 한 꺼번에 만드는 것이 좋다.
const namedPointSpread = { ...pt, ...id };

//객체 연산자를 사용하면 타입 걱정 없이 필드 단위로 객체를 생성할 수도 있다.
//모든 업데이트마다 새 변수를 사용하여 각각 새로운 타입을 얻도록 하는게 중요하다.
const pt0 = {};
const pt1 = { ...pt0, x: 3 };
const ptv: Point = { ...pt1, y: 4 };
