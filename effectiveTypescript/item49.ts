//콜백에서 this에 대한 타입 제공하기

//자바스크립트에서 this 키워드는 매우 혼란스러운 기능이다.
//let이나 const로 선언된 변수가 렉시컬 스코프인 반면, this는 다이나믹 스코프다.
//this는 전형적으로 객체의 현재 인스턴스를 참조하는 클래스에서 많이 사용한다.
class C {
    vals = [1, 2, 3]

    logSquare() {
        for (const val of this.vals) {
            console.log(val * val);
        }
    }
}

class ResetButton {
    constructor() {
        this.onClick = this.onClick.bind(this);
    }

    render() {
        return;
    }

    onClick() {
        alert(`Reset ${this}`); //생성자에 bind도 묶지 않으면 정의되지 않았다는 경고가 나옴.
    }
}

function addKeyListener(el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) {
    el.addEventListener('keydown', e => {
        // fn(e);
        fn.call(el ,e);
    });

}

//this 바인딩이 동작하는 원리를 이해해야 한다.
//콜백 함수에서 this를 사용해야 한다면, 타입 정보를 명시해야 한다.