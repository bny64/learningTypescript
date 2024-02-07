//일관성 있는 별칭 사용하기

const borough = { name: "Brooklyn", location: [40, 73] };
const loc = borough.location;
//별칭을 남발하면 제어 흐름을 분석하기 어렵다.

interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}

// function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
//   if (polygon.bbox) {
//     if (
//       pt.x < polygon.bbox.x[0] ||
//       pt.x > polygon.bbox.x[1] ||
//       pt.y < polygon.bbox.y[0] ||
//       pt.y > polygon.bbox.x[1]
//     ) {
//       return false;
//     }
//   }
// }
//위 함수는 polygon.bbox가 중복된다.

//아래 처럼 객체 비구조화 할당을 이용해 일관된 이름을 사용할 수 있다.
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  const { bbox } = polygon;
  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > y[1] || pt.y < y[0] || pt.y > x[1]) {
      return false;
    }
  }

  console.log(polygon.bbox);
  if (polygon.bbox) {
    console.log(polygon.bbox);
    fn(polygon); //함수 내에서 polygon.bbox를 제거할 가능성이 있다.
    console.log(polygon.bbox);
  }
}

function fn(p: Polygon) {}

//별칭은 타입스크립트가 타입을 좁히는 것을 방해한다. 변수에 별칭을 사용할 때 일관되게 사용해야 한다.
//비구조화 문법을 통해 일관된 이름을 사용해야 한다.
//함수 호출이 객체 속성의 타입 정제를 무효화 할 수 있다.
//속성보다 지역 변수를 사용하면 타입 정제를 믿을 수 있다.
