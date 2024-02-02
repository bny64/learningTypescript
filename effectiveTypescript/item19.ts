// 추론 가능한 타입을 사용해 장황한 코드 방지하기

//모든 변수에 타입을 선언하는 것은 비생산적이다.
//타입을 확신하지 못한다면 편집기를 통해 체크

const person: {
  name: string;
  born: {
    where: string;
    when: string;
  };
  died: {
    where: string;
    when: string;
  };
} = {
  name: "Soju",
  born: {
    where: "Swar",
    when: "19",
  },
  died: {
    where: "Swar",
    when: "80",
  },
};
//위와 같은 객체는 타입을 생략해도 된다. 값에 추가로 타입을 작성하는 건 거추장스럽다.

interface Product {
  id: number;
  name: string;
  price: number;
}

function logProduct(product: Product) {
  const id = product.id;
  const name = product.name;
  const price = product.price;
  console.log(id.toFixed());
}

//위 함수에서 비구조화 할당문을 사용하는 것이 좋다.
function logProduct2(product: Product) {
  const { id, name, price }: { id: number; name: string; price: number } =
    product;
}
//위 처럼 명시적 타입 구문을 넣는다면 불필요한 타입 선언으로 인해 코드가 번잡해진다.
//이상적인 타입스크립트 코드는 함수/메서드 시그니처에 타입 구문을 포함하지만, 함수 내에서 생성된 지역 변수에는 타입 구문을 넣지 않습니다.
//타입구문을 생략하여 방해되는 것을 최소화하고 코드를 읽는 사람이 구현 로직에 집중하도록 하는 것이 좋다.
//타입 정보가 있는  라이브러리에서, 콜백함수의 매개변수 타입은 자동으로 추론되기 때문에 선언은 필요 없다.

//함수의 반환타입은 명시해 주는 것이 좋다.
//미리 타입을 며시하는 방법은 함수를 구현하기 전에 테스트를 먼저 작성하는 테스트 주도 개발과 비슷하다.
//명명된 타입을 사용하기 위해 반환타입을 명시한다.
//추론된 반환 타입이 복잡해질수록 명명된 타입을 제공하는 이점이 커진다.

//타입스크립트가 타입을 추론할 수 있다면 타입 구문을 작성하지 않는게 좋다.
//이상적인 경우 함수/메서드 시그니처에는 타입 구문이 있지만 함수 내의 지역 변수에는 타입 구문이 없다.
//추론될 수 있는 경우라도 객체 리터럴과 함수 반환에는 타입 명시를 고려해야 한다.
