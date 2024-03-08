//타입 커버리지를 추적하여 타입 안전성을 유지하기

//noImplicitAny를 설정하고 모든 암시적 any 대신 명시적 타입 구문을 추가해도 any타입과 관련된 문제들로부터 안전하다고 할 수 없다.
//any 타입이 여전히 프로그램 내에 존재할 수 있는 두 가지 경우가 있다.

//명시적 any 타입
//아이템 38,39의 내용에 따라 any타입의 범위를 좁히고 구체적으로 만들어도 any 타입이다.
//특히 any, {[key: string] : any} 같은 타입은 인덱스를 생성하면 단순 any가 되고 코드 전반에 영향을 미친다.

//서드파티 선언
//@types 선언 파일로부터 any 타입이 전파되기 때문에 특별히 조심해야 한다.
//noImplicitAny를 설정하고 절대 any를 사용하지 않았다 하더라도 여전히 any 타입은 코드 전반에 영향을 미친다.

//npx type-coverage 를 이용해 any를 추적할 수 있다.
//npx type-coverage --detail 플래그를 붙이면 any 타입이 있는 곳을 모두 출력해준다.

//noImplicitAny가 설정되어 있어도, 명시적 any 또는 서드파티 타입 선언(@type)을 통해 any 타입은 코드 내 여전히 존재할 수 있다.
//작성한 프로그램의 타입이 얼마나 잘 선언되었는지 추적해야 한다.