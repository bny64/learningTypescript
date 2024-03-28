//마이그레이션의 완성을 위해 noImplicitAny 설정하기

//마이그레이션 마지막 단계는 noImplicitAny를 설정하는 것이다.
//noImplicitAny를 설정하지 않으면, 타입 체크는 허술해진다.
//처음에는 noImplicitAny를 로컬에서 설정하고 작업하는 것이 좋다.
//타입 체커가 발생하는 오류의 갯수는 noImplicitAny와 관련된 작업의 진척도를 나타내는 지표로 활용할 수 있다.
//noImplicitAny는 상당히 엄격한 설정이며, strictNullChecks 같은 설정을 적용하지 않아도 대부분의 타입 체크를 적용한 것으로 볼 수 있다.
//가장 강력한 단계는 strict: true이다. 점점 높여가는 것이 좋다.

//noImplicitAny 설정을 활성화하여 마이그레이션의 마지막 단계를 진행해야 한다.
//noImplicitAny 설정이 없다면 타입 선언과 관련된 실제 오류가 드러나지 않는다.
//noImplicitAny를 전면 적용하기 전에 로컬에서부터 타입 오류를 점진적으로 수정해야 한다.