//타입 주변에 null값 배치하기
function extent(nums: number[]) {
    let min, max;
    for (const num of nums) {
        if (!min) {
            min = num;
            max = num;
        } else {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }

    }
    return [min, max];
}
//위 함수에는 최솟값, 최댓값이 0인 경우 값이 덧씌워져 버린다.
//[0,1,2] 의 결과는 [0,2]가 아니라 [1,2]다
//nums 배열이 비어 있다면 [undefined, undefined]를 반환한다.
//undefined를 포함하는 객체는 다루기 어렵고 권장하지 않는다.