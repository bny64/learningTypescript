//유효한 상태만 표현하는 타입을 지향하기

//타입을 뒤죽박죽 설계하면 도움이 되지 않는다.
//잘못된 예

let currentPage = "now";
let newPage = "new";
function getUrlForPage(page) {
  return "";
}

interface State {
  pageText: string;
  isLoading: boolean;
  error?: string;
}

function renderPage(state: State) {
  if (state.error) {
    return `Error! Unable to load ${currentPage}: ${state.error}`;
  } else if (state.isLoading) {
    return `Loading ${currentPage}...`;
  }
  return `<h1>${currentPage}</h1>\n${state.pageText}`;
}
//위 코드에서 isLoading이 true이고 error 값이 존재하면 로딩 중인 상태인지 오류 상태인지 명확히 구분할 수 없다.

async function changePage(state: State, newPage: string) {
  state.isLoading = true;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const text = await response.text();
    state.isLoading = false;
    state.pageText = text;
  } catch (e) {
    state.error = "" + e;
  }
}
//상태 값의 두 가지 속성이 동시에 정보가 부족하거나(요청이 실패한 것인지, 여전히 로딩 중인지 알 수 없다.)
//두 가지 속성이 충돌(오류이면서 동시에 로딩) 할 수 있다는 것이다.
//State 타입은 isLoading이 true이면서 동시에 error 값이 설정되는 무효한 상태를 허용한다.
//다음은 어플리케이션의 상태를 좀 더 제대로 표현한 방법이다.
interface RequestPending {
  state: "pending";
}

interface RequestError {
  state: "error";
  error: string;
}

interface RequestSuccess {
  state: "ok";
  pageText: string;
}

type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: { [page: string]: RequestState };
}

//네트워크 요청 과정 각각의 상태를 명시적으로 모델링하는 태그된 유니온을 사용했다.
//코드가 길어지긴 했지만 무효한 상태를 허용하지 않도록 개선했다.
//renderPage 함수도 개선할 수 있다.
function renderPage2(state: State) {
  const { currentPage } = state;
  const requestState = state.requests[currentPage];
  switch (requestState.state) {
    case "pending":
      return `Loading ${currentPage}...`;
    case "error":
      return `Error! Unable to load ${currentPage}: ${requestState.error}`;
    case "ok":
      return `<h1>${currentPage}</h1>\n${state.pageText}`;
  }
}

//개선된 changePage 함수
async function changePage2(state: State, newPage: string) {
  state.requests[newPage] = { state: "pending" };
  state.currentPage = newPage;
  try {
    const response = await fetch(getUrlForPage(newPage));
    if (!response.ok) {
      throw new Error(`Unable to load ${newPage}: ${response.statusText}`);
    }
    const pageText = await response.text();
    state.requests[newPage] = { state: "ok", pageText };
  } catch (e) {
    state.requests[newPage] = { state: "error", error: "" + e };
  }
}
