//유니온의 인터페이스보다는 인터페이스의 유니온 사용하기
type Filllayout = string;
type LineLayout = string;
type FillPaint = string;
type LinePaint = string;

interface Layer {
    type: 'fill' | 'line';
    layout: Filllayout | LineLayout;
    paint: FillPaint | LinePaint;
}

//layout이 LineLayout이면서 paint 속성이 FillPaint 타입인 것은 말이 안된다.

interface FillLayer {
    type: 'fill';
    layout: Filllayout;
    paint: FillPaint;
}

interface LineLayer {
    type: 'line';
    layout: LineLayout;
    paint: LinePaint;
}

type layer2 = FillLayer | LineLayer;

//위 처럼 설계하는 것이 좋다.
function drawLayer(layer: Layer) {
    if (layer.type === 'line') {
        const {paint, layout} = layer;
    } else if (layer.type === 'fill') {
        const {paint, layout} = layer;
    }
}

//태그된 유니온은 타입스크립트 타입 체커와 잘 맞기 때문에 이 패턴을 기억해서 필요할 때 적용할 수 있도록 해야 한다.

interface Person {
    name: string;
    //둘 다 동시에 있거나 동시에 없다.
    placeOfBirth: string;
    dateOfBirth: Date;
}

//위 주석은 문제가 될 소지가 높다.
interface newPerson {
    name: string;
    birth?: {
        place: string;
        date: Date;
    }
}

//위 처럼 하나로 모으는 것이 더 좋은 설계이다.

//타입 구조를 손댈 수 없는 상황이면 앞서 다룬 인터페이스의 유니온을 사용해서 속성 사이의 관계를 모델링할 수 있다.
interface Name {
    name: string;
}

interface PersonWithName extends Name {
    placeOfBirth: string;
    dateOfBirth: Date;
}

type PersonUnion = Name | PersonWithName;

//유니온 타입의 속성을 여러 개 가지는 인터페이스에서는 속성 간의 관계가 분명하지 않기 때문에 실수가 자주 발생하므로 주의해야 한다.
// 유니온의 인터페이스보다 인터페이스의 유니온이 더 정확하고 타입스크립트가 이해하기도 좋다.
//타입스크립트의 제어 흐름을 분석할 수 있도록 타입에 태그를 넣는 것을 고려해야 한다. 자주 보이는 패턴이다.