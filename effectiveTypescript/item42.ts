//모르는 타입의 값에는 any 대신 unknown 사용하기

//함수의 반환값과 관련된 unknown
function parseYAML(yaml: string): unknown {
    return null;
}

interface Book {
    name: string;
    author: string;
}

const book = parseYAML(`
    name: Wuthenring Height
    author: Emily Bronte
`);

//호출한 곳에서 타입 선언을 생락하게 되면 book 변수는 암시적 any 타입이 되고 사용하는 곳 마다 타입 오류가 발생한다.
//대신 unknown 타입을 반환하게 만드는 것이 더 안전하다.

//any가 위험한 이유는 두 가지 특징이 있다.
//1. 어떠한 타입이든 any 타입에 할당 가능하다.
//2. any타입은 어떠한 타입으로도 할당 가능하다.
//타입 체커는 집합 기반이기 때문에 any를 사용하면 타입 체커가 무용지물이 된다는 것을 주의해야 한다.

//unknown은 any 대신 쓸 수 있는 타입 시스템에 부합하는 타입이다.
//unknown은 any의 첫 번째 속성을 만족하지만 두 번째 속성을 만족하지 않는다.
//반면 never 타입은 unknown과 정반대이다. 1번은 만족하지 않지만 2번은 만족한다.

//한 편 unknown 타입인 채로 값을 사용하면 오류가 발생한다.
//unknown인 값에 함수 호출을 하거나 연산을 하려고해도 마찬가지이다.
//unknown 상태로 사용하려고 하면 오류가 발생하기 때문에, 적절한 타입으로 변환하도록 강제할 수 있다.

// const book2 = safeParseYAML(``) as Book;
// alert(book2.title);
//함수의 반환 타입인 unknown 그대로 사용할 수 없기 때문에 Book으로 타입 단언을 해야 한다.


//변수 선언과 관련된 unknown
//어떠한 값이 있지만 그 타입을 모르는 경우에 unknown을 사용한다.
interface Feature {
    id: string | number;
    properties: unknown;
}

//타입 단언문이 unknown에서 원하는 타입으로 변환하는 유일한 방법은 아니다.
//instanceof를 체크한 후 unknown에서 원하는 타입으로 변경할 수 있다.
function processValue(val: unknown) {
    if (val instanceof Date) {

    }
}

//사용자 정의 타입 가드도 unknown에서 원하는 타입으로 변환할 수 있다.
function isBook(val: unknown): val is Book {
    return (typeof (val) === 'object' && val !== null && 'name' in val && 'author' in val);
}

//unknown 타입의 범위를 좁히기 위해 많은 노력이 필요하다.
//in 연산자의 오류를 피하기 위해 val이 객체임을 확인해야 하고 typeof null === 'object' 이므로 별도로 val이 null이 아님을 확인해야 한다.
//가끔 unknown 대신 제네릭 매개변수가 사용되는 경우가 있는데 좋지 않다.
function safeParseYAML<T>(yaml: string): T {
    return parseYAML(yaml);
}
//제네릭을 사용한 스타일은 타입 단언문과 달라 보이지만 기능은 동일하다.
//제네릭 보다는 unknown을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히는 것이 좋다.


//단언문과 관련된 unknown
//이중 단언문에서 any대신 unknown을 사용할 수 있다.
declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;

//barAny와 barUnk는 기능적으로 동일하지만, 나중에 두 개의 단언문을 분리하는 리팩터링을 한다면 unknown 형태가 더 안전하다.
//any의 경우 분리되는 순간 영향력이 전염병처럼 퍼지게 되지만 unknown은 즉시 오류가 발생한다.

//unknown과 유사한 object, {}
//unknown보다는 범위가 약간 좁다.
//{} 타입은 null, undefined를 제외한 모든 값을 포함한다.
const a:{} = 12;
//object 타입은 모든 !비기본형! 타입으로 이루어진다.(null, undefined 포함 X)
//unknown 타입이 도입되기 전에 {}가 일반적으로 사용되었지만, 최근에는 드물다.
//정말로 null, undefined가 불가능하다고 판단될 때 unknown 대신 {}를 사용하면 된다.

//unknown은 any 대신 사용할 수 있는 안저한 타입이다.
//값이 있지만 타입을 알지 못하면 unknown을 사용하면 된다.
//사용자가 타입 단언문이나 타입 체크를 사용하도록 강제하려면 unknown을 사용하면 된다.
//{}, object, unknown의 차이를 이해해야 한다.