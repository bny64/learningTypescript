//테스팅 타입의 함정에 주의하기

//dtslint 또는 타입 시스템 외부에서 타입을 검사하는 유사한 도구를 사용하는 것이 안전하다.
//함수를 실행만 하는 테스트 코드가 의미 없는 것은 아니지만, 실제로 반환 타입을 체크하는 것이 훨씬 좋은 테스트 코드다.

import {map} from "lodash";

const lengths: number[] = map(['john', 'paul'], name => name.length);
//위 코드는 일반적으로 불필요한 타입 선언에 해당한다.
//하지만 테스트 코드 관점에서는 중요한 역할을 한다.
//number[] 타입 선언은 map 함수의 반환 타입이 number[]임을 보장한다.
//테스팅을 위해 할당을 사용하는 방법에는 두 가지 근본적인 문제가 있다.
//첫 번째, 불필요한 변수를 만들어야 한다.
function assertType<T>(x: T) {
}

assertType<number[]>(map(['john', 'paul'], name => name.length))
//이 코드는 불필요한 변수 문제를 해결하지만 두 타입이 동일한지 체크하는 것이 아니라 할당 가능성을 체크하고 있다.

const double = (x: number) => 2 * x;
assertType<(a: number, b: number) => number>(double); //정상?
//double 함수의 체크가 성공하는 이유는, 타입스크립트의 함수는 매개변수가 더 적은 함수 타입에 할당 가능하기 때문이다.

const g: (x: string) => any = () => 12; //정상
//위 콛는 선언된 것보다 적은 매개변수를 가진 함수를 할당하는 것이 아무런 문제가 없다는 것을 보여준다.
//이런 사례는 콜백 함수에서 흔히 볼수 있기 때문에, 타입스크립트에서는 이러한 동작을 모델링하도록 설계되어 있다.

//로대시의 map 함수의 콜백은 세 가지 매개변수를 받는다.
// map(array, (name, index, array) => {/* ... */});
//콜백 함수는 세 가지 매개변수 name, index, array 중에서 한 두개만 보통 사용한다.
//세 개를 사용하는 경우는 드물다.
//제대로 된 assertType 사용방법은 Parameters와 ReturnType 제너릭 타입을 이용해 함수의 매개변수 타입과 반환 타입만 분리하여 테스트할 수 있다.
const double2 = (x: number) => 2 * x;
let p: Parameters<typeof double> = null!;
typeof double
assertType<[number, number]>(p);

//DefinitelyTyped의 타입 선언을 위한 도구 dtslint => 추후 사용해보기

//타입을 테스트할 때는 특히 함수 타입의 동일성과 할다 가능성의 차이점을 알아야 한다.
//콜백이 있는 함수를 테스트할 때, 콜백 매개변수의 추론된 타입을 체크해야 한다. 또한 this가 API의 일부분이면 역시 테스트해야 한다.
//타입 관련된 테스트에서 any를 주의. 엄격한 테스트를 위해 dtslint 같은 도구를 사용하는 것이 좋다.
