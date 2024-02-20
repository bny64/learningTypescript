//문서에 타입 정보를 쓰지 않기

type color = string;
/* 애플리케이션 또는 특정 페이지의 전경색을 가져온다 */
function getForegroundColor(page?: string): color {
    return '';
    //...
}

// 값을 변경하지 않는 주석보다 readonly 사용
function sort(nums: readonly number[]) {
    
}

//주석과 변수명에 타입 정보를 적는 것은 피해야 한다.
//타입 정보에 모순이 생길 수 있다.
//타입이 명확하지 않은 경우는 변수명에 단위 정보를 포함하는 것을 고려해야 한다.(timeMs, temperatureC)