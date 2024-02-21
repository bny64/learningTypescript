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
//strictNullChecks 설정을 켜면 문제점이 드러난다.

function extent2(nums: []) {
    let result: [number, number] | null = null;
    for (const num of nums) {
        if (!result) {
            result = [num, num];
        } else {
            result = [Math.min(num, result[0]), Math.max(num, result[1])];
        }
    }
    return result;
}

// 이제는 반환 타입이 [number, number] | null 이 되어서 사용하기 수월해졌다.
// !null 아님 단언을 사용하면 min, max를 얻을 수 있다.

//null과 null이 아닌 값을 섞어서 사용하면 클래스에서도 문제가 생긴다.
class UserPosts {
    user: UserInfo | null;
    posts: Post[] | null;

    constructor() {
        this.user = null;
        this.posts = null;

    }

    async init(userId: string) {
        return Promise.all([
            async () => this.user = await fetchUser(userId),
            async () => this.posts = await fetchPostsForUser(userId)
        ])
    }

    getUserName() {

    }
}

//두 번의 네트워크 요청이 로드되는 동안 user와 posts 속성은 null이다.
//속성값의 불확실성이 클래스의 모든 메서드에 나쁜 영향을 미친다.

//개선된 userPosts
class UserPosts2 {
    user: UserInfo;
    posts: Post[];

    constructor(user: UserInfo, posts: Post[]) {
        this.user = user;
        this.posts = posts;
    }

    static async init(userId: string): Promise<UserPosts2> {
        const [user, posts] = await Promise.all([fetchUser(userId), fetchPostsForUser(userId)]);
        return new UserPosts2(user, posts);
    }

    getUserName() {
        this.user.name;
    }
}
//이제 UserPosts는 완전히 null이 아니게 됐다.
//데이터가 부분적으로 준비되었을 때 작업을 시작해야한다면, null과 null이 아닌 경우의 상태를 다루어야 한다.

//한 값의 null 여부가 다른 값의 null여부에 암시적으로 관련되도록 설계하면 안 된다.
//API 작성시 반환 타입을 큰 객체로 만들고 반환 타입 전체가 null 이거나 null이 아니게 만들어야 한다.
//클래스를 만들 때는 필요한 모든 값이 준비되었을 때 생성하여 null이 존재하지 않도록 하는 것이 좋다.
//strictNullChecks 설정하면 오류가 표시되지만 null 값과 관련된 문제점을 찾아낼 수 있어 반드시 필요하다.