//의존성 관계에 따라 모듈 단위로 전환하기

//의존성과 관련된 오류없이 작업하려면, 다른 모듈에 의존하지 않는 최하단 모듈부터 작업을 시작해서 의존성의 최상단에 있는 모듈을 마지막으로 완성해야 한다.
//프로젝트 내에 존재하는 모듈은 서드파티 라이브러리에 의존하지만 서드파티 라이브러리는 해당 모듈에 의존하지 않기 때문에, 서드파티 라이브러리 타입정보를 가장 먼저 해결한다.
//일반적으로 @types 모듈을 설치한다.
//프로젝트 내의 모듈은 API에 의존하지만 API는 해당 모듈에 의존하지 않기 때문에 서드파티와 마찬가지로 먼저 해결하는 것이 좋다.
//외부 API의 타입정보는 특별한 문맥이 없기 때문에 타입스크립트가 추론하기 어렵다.
//API에 대한 사양을 기반으로 타입정보를 생성해야 한다.

//마이그레이션 할 때 타입 정보만 추가하고, 리팩토링을 해서는 안 된다.
//코드 개선이 목표가 아니라 타입스크립트로 전환하는 것이 목표다.

//선언되지 않은 클래스 멤버
//자바스크립트는 클래스 멤버 변수를 선언할 필요가 없지만, 타입스크립트에서는 명시적으로 선언해야 한다.
class Greeting {
    greeting: string;
    name: any;
    constructor(name: string) {
        this.greeting = 'Hello';
        this.name = name;
    }

    greet() {
        return this.greeting + ' ' + this.name;
    }
}

//타입이 바뀌는 값
//한꺼번에 객체를 생성하면 간단히 오류를 해결할 수 있다.
const state = {
    name: 'New York',
    capital: 'Albany'
}
//한꺼번에 생성하기 곤란한 경우 타입 단언문을 사용할 수 있다.
//마이그레이션이 완료된 후에는 문제를 제대로 해결해야 한다.

//JSDoc와 @ts-check를 사용해 타입 정보를 추가한 상태라면 타입스크립트로 전환하는 순간 타입 정보가 "무효화" 된다는 것에 주의해야 한다.

//마이그레이션의 첫 단계는, 서드파티 모듈과 외부 API 호출에 대한 @types를 추가하는 것이다.
//의존성 관계도의 아래에서부터 위로 올라가며 마이그레이션을 하면 된다. 첫 번째 모듈은 보통 유틸리티 모듈이다.
//의존성 관계도를 시각화하여 진행 과정을 추적하는 것이 좋다.
//이상한 설계를 발견하더라도 리팩터링을 하면 안된다. 마이그레이션 작업은 타입스크립트 전환에 집중해야 하며, 나중에 리팩토링을 위해 목록을 만들어 두는 것이 좋다.
//타입스크립트로 전환하며 발견하게 되는 일반적인 오류들을 놓치지 않아야 한다. 타입 정보를 유지하기 위해 필요에 따라 JSDoc 주석을 활용해야 한다.