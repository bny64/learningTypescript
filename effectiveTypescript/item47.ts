//공개 API에 등장하는 모든 타입을 익스포트하기

//타입 간의 매핑을 해 주는 도구가 많이 있으며, 웬만하면 필요한 타입을 참조하는 방법을 찾을 수 있습니다.
//라이브러리 제작자는 프로젝트 초기 타입 익스포트부터 작성해야 한다.

interface SecretName {
    first: string;
    last: string;
}

interface SecretSanta {
    name: SecretName;
    gift: string;
}


export function getGift(name: SecretName, gift: string): SecretSanta {
    return {
        name: {
            first: 'john',
            last: 'power'
        },
        gift: 'hoho'
    }
}

//타입을 임포트할 수 없는 경우 Parameters와 ReturnType 제네릭 타입을 이용한다.

type MySanta = ReturnType<typeof getGift>;
type MyName = Parameters<typeof getGift>[0];

//공개 메서드에 등장한 어떤 형태의 타입이든 익스포트하는게 좋다.
//라이브러리 사용자가 추출할 수도 있다.