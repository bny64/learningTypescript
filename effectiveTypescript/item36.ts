//해당 분야의 용어로 타입 이름 짓기

interface Animal {
    name: string;
    endangered: boolean;
    habitat: string;
}

//name은 일반적인 용어이다. 학명인지 일반적인 명칭인지 알 수 없다.
//endangered 멸종위기 표현을 위해 boolean 타입을 사용했는데 이미 멸종된 동물을 true로 해야 하는지 판단할 수 없다.

type ConservationStatus = 'EX' | 'EW';
type KoppenClimate = 'Af' | 'Am'

//개선포인트
interface Animal2 {
    commonName: string; //더 구체적인 용어로 대체
    genus: string; //더 구체적인 용어로 대체
    species: string; //더 구체적인 용어로 대체
    status: ConservationStatus;
    climates: KoppenClimate[]
}

//동일한 의미를 나타낼 때는 같은 용어를 사용해야 한다.
//data, thing, item, object, entity 같은 모호하고 의미 없는 이름은 피해야 한다.
//이름을 지을 떄 포함된 내용이나 계산 방식이 아니라 데이터 자체가 무엇인지 고려해야 한다.
//INodeList보다는 Directory가 더 의미있는 이름이다. 좋은 이름은 추상화의 수준을 높이고 의도치 않은 충돌의 위험성을 줄여준다.