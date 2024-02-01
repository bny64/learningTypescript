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
