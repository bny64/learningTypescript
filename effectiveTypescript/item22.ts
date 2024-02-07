//타입 좁히기

//일반적인 null check
const el = document.getElementById("foo");
if (el) {
  el.innerHTML = "Party Time".blink(); //타입이 HTMLElement
} else {
  alert(""); //타입이 null
}

function contains(text: string, search: string | RegExp) {
  //instanceof를 이용한 타입 좁히기
  if (search instanceof RegExp) {
    return !!search.exec(text);
  }
  return text.includes(search);
}

//타입을 좁히는 다른 일반적인 방법 : 명시적 태그 사용
interface UploadEvent {
  type: "upload";
  filename: string;
  contents: string;
}
interface DownloadEvent {
  type: "downalod";
  filename: string;
}
type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(e: AppEvent) {
  switch (e.type) {
    case "downalod":
      break;
    case "upload":
      break;
  }
}
//이 패턴은 태그된 유니온 또는 구별된 유니온이라고 불린다.

function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return "value" in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    return el.value;
  }
  return el.textContent;
}
//이러한 기법을 사용자 정의 타입 가드라고 한다.

const jackson5 = ['Jacke','Tito']; 

function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const members = ["Janet", "Michael"]
  .map((who) => jackson5.find((n) => n === who))
  .filter(isDefined);
//위와 같이 타입가드를 사용해 타입을 좁힐 수 있다.
//타입스크립트에서 타입이 어떻게 좁혀지는지 이해한다면 타입 추론에 대한 개념을 잡을 수 있고, 오류 발생의 원인을 알 수 있으며
//타입 체커를 더 효율적으로 이용할 수 있다.

//분기문 외에도 여러 종류의 제어 흐름을 사렾보며 타입스크립트가 타입을 좁히는 과정을 이해해야 한다.
//태그된, 구별된 유니온과 사용자 정의 타입 가드를 사용하여 타입 좁히기 과정을 원활하게 할 수 있다.