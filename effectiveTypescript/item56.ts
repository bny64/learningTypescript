//정보를 감추는 목적으로 private를 사용하지 않기

//타입스크립트에서 컴파일 후에는 private, protected, public은 제거되기 때문에 은닉화를 위해 private를 사용하지 말고 클로저를 사용해야 한다.

//다음 코드처럼 생성자에서 클로저를 만들어 낼 수 있다.
declare function hash(text: string): number;

class PasswordChecker {
    checkPassword: (password: string) => boolean;

    constructor(passwordHash: number) { //생성자 외부에서 passwordHash 변수에 접근할 수 없기 때문에 정보를 숨기는 목적 달성.
        //주의할 점은 passwordHash를 생성자 외부에서 접근할 수 없기 때문에, passwordHash에 접근해야 하는 메서드 역시 생성자 내부에 정의되어야 한다.
        //그리고 메서드 정의가 생성자 내부에 존재하게 되면, 인스턴스를 생성할 때 마다 각 메서드의 복사본이 생성되기 때문에 메모리를 낭비하게 된다는 것을 기억해야 한다.
        //또한 동일한 클래스로부터 생성된 인스턴스(클래스 내에서 생성된)라고 하더라도 서로의 비공개 데이터에 접근하는 것이 불가능하다.
        this.checkPassword = (password: string) => {
            return hash(password) === passwordHash;
        }
    }
}

const checker = new PasswordChecker(hash('s3cret'));
checker.checkPassword('s3cret'); //true
//다른 하나의 선택지로 비공개 필드 기능을 사용할 수 있다. 접두사#
//클로저 기법과 다르게 클래스 메서드나 동일한 클래스의 개별 인스턴스(동일한 클래스 내에서 생성된)끼리는 접근이 가능하다.
//만약 설계 관점의 캡슐화가 아닌 '보안'에 대해 걱정하고 있다면, 내장된 프로토타입과 함수에 대한 변조 같은 문제를 알고 있어야 한다.

//public, protected, private 접근 제어자는 타입 시스템에서만 강제될 뿐이다.
//런타임에는 소용이 없으면 단언문을 통해 우회할 수 있다. 접근 제어자로 데이터를 감추려고 하면 안된다.
//데이터를 감추고 싶다면 클로저를 사용해야 한다.