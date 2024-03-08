//devDependencies에 typescript와 @types 추가하기

//dependencies : 현재 프로젝트를 실행하는 데 필수적인 라이브러리들이 포함된다. 프로젝트 runtime에 lodash가 사용된다면 dependencies에 포함되야 한다.
//devDependencies : 현재 프로젝트를 개발하고 테스트하는데 사용되지만, 런타임에는 필요 없는 라이브러리
//peerDependencies : 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리들이 포함된다. 플러그 인을 들 수 있다.

//타입 스크립트는 개발 도구이기 때문에 타입 정보는 런타임에 존재하지 않기 때문에 타입스크립트와 관련된 라이브러리는 일반적으로 devDependencies에 속한다.

//타입스크립트 프로젝트에서 고려해야 할 두가지 사항
//1. 시스템 레벨로 설치할 수 있지만 추천하지 않는다. 동일한 버전을 사용한다는 보장이 없다. 프로젝트를 셋업할 때 별도의 단계가 추가된다.
//따라서 타입스크립트를 시스템 레벨로 설치하기보다는 devDependencies에 넣는 것이 좋다.
//대부분의 IDE는 devDependencies를 통해 설치된 타입스크립트 버전을 인식할 수 있도록 되어 있다.

//2. 타입 의존성(@type)을 고료해야 한다.
//사용하려는 라이브러리에 타입 선언이 포함되어 있지 않더라도 DefinitelyTyped에서 타입 정보를 얻을 수 있다.
//DefinitelyTyped의 타입 정의들은 npm 레지스트리의 @types 스코프에 공개된다.
//원본 라이브러리 자체가 dependencies에 있더라도 @types의 의존성은 devDependensies에 있어야 한다.
//리액트 타입 선언과 의존성 추가는 아래와 같다
//$ npm install react
//$ install --save-dev @types/react

//타입스크립트를 시스템 레벨로 설치하면 안 된다.
//타입스크립트를 프로젝트의 devDepenencies에 포함시키고 팀원 모두가 동일한 버전을 사용해야 한다.
//@types 의존성은 dependencies가 아니라 devDependencies에 포함시켜야 한다.