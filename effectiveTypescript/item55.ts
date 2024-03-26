//DOM 계층 구조 이해하기
//document.getElementById를 사용할 때나 엘리먼트 생성을 위해 document.createElement를 사용할 때, 차이가 무엇인지 모르더라도 어떠한 엘리먼트라는 것은 분명하다.
//타입스크립트에서 DOM 엘리먼트 계층 구조를 파악하기 용이하다.
//Element와 EventTarget에 달려 있는 Node의 구체적인 타입을 안다면 타입 오류를 디버깅 할 수 있고, 언제 타입 단언을 사용해야 할 지 알 수 있다.
//HTMLParagraphElement는 HTMLElement의 서브타입이고, HTMLEelement는 Element의 서브타입이다.
//또한 Element는 Node의 서브타입이고, Node는 EventTarget의 서브타입이다.
//일반적으로 타입 단언문은 지양해야 하지만 DOM 관련해서는 우리가 더 정확히 알고 있는 경우이므로 단언문을 사용해도 좋다.
//document.getElementById('my-div') as HTMLDivElement;
//실제 코드에서 document.getElementById가 null일 가능성이 있다면 if 분기문을 추가해야 한다.
//EventTarget 타입의 계층 구조뿐 아니라, Event 타입에도 별도의 계층 구조가 있다.

function handleDrag(eDown: Event) {
    const targetEl = eDown.currentTarget;
    targetEl.classList.add('dragging');
    const dragStart = [ eDown.clientX, eDown.clientY ];
    const handleUp = (eUp: Event) => {
        targetEl.classList.remove('dragging');
        targetEl.removeEventListener('mouseup', handleUp);
        const dragEnd = [eUp,.clientX, eUp.clientY];
        console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
    }
    targetEl.addEventListener('mouseup', handleUp);
}
const div = document.getElementById('surface');
div.addEventListener('mousedown', handleDrag);

//수정 결과
function addDragHandler(el: HTMLElement) {
    el.addEventListener('mousedown', eDown => {
        const dragStart = [ eDown.clientX, eDown.clientY ];
        const handleUp = (eUp: MouseEvent) => {
            el.classList.remove('dragging');
            el.removeEventListener('mouseup', handleUp);
            const dragEnd = [eUp.clientX, eUp.clientY];
            console.log('dx, dy = ', [0, 1].map(i => dragEnd[i] - dragStart[i]));
        }
        el.addEventListener('mouseup', handleUp);
    });
}

const div2 = document.getElementById('surface');
if (div2) {
    addDragHandler(div2);
}
//코드 마지막의 if 구문은 #surface 엘리먼트가 없는 경우를 체크한다.
//만약 해당 엘리먼트가 반드시 존재한다면, if 구문 대신 단언문을 사용할 수 있다. div2!

//자바스크립트를 사용할 때 DOM에는 타입 계층 구조가 있다.
//DOM 타입은 타입스크립트에서 중요한 정보이며, 브라우저 관련 프로젝트에서 타입스크립트를 사용할 때 유용하다.
//Node, Element, HTMLElement, EventTarget 간의 차이점, 그리고 Event, MouseEvent의 차이점을 알아야 한다.
//DOM 엘리먼트와 이벤트에는 충분히 구체적인 타입 정보를 사용하거나, 타입스크립트가 추론할 수 있도록 문맥 정보를 활용해야 한다.