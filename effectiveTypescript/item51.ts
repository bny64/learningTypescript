//의존성 분리를 위해 미러 타입 사용하기

function parseCsv(contents: string | Buffer): { [column: string]: string }[] {
    if (typeof contents === 'object') {
        return parseCsv(contents.toString('utf8'));
    }
    return [{a: 'a'}];
}

//앞에서 작성한 CSV 파싱 라이브러리를 공개하면 타입 선언도 포함하게 된다.
//그리고 타입 선언이 @types/node에 의존하기 때문에 @types/node는 devDependencies로 포함되야 한다.
//하지만 @types/node를 devDependencies로 포함하면 두 그룹의 라이브러리 사용자들에게 문제가 생긴다.
//1. @types와 무관한 자바스크립트 개발자
//2. NodeJS와 무관한 타입스크립트 웹 개발자

interface CsvBuffer {
    toString(encoding: string): string;
}

function parseCSV(contents: string | CsvBuffer): { [column: string]: string }[] {
    if (typeof contents === 'object') {
        return parseCsv(contents.toString('utf8'));
    }
    return [{a: 'a'}];
}

//CsvBuffer는 Buffer인터페이스보다 훨씬 짧으면서도 실제로 필요한 부분만을 떼어 내어 명시했다.
//또한 해당 타입이 Buffer와 호환되기 때문에 NodeJS프로젝트에서는 실제 Buffer 인스턴스로 parseCSV를 호출하는 것이 가능하다.
//작성 중인 라이브러리가 의존하는 라이브러리의 구현과 무관하게 타입에만 의존한다면, 필요한 선언부만 추출하여 작성 중인 라이브러리에 넣는 것(미러링)을 고려해 보는 것도 좋다.
//다른 라이브러리의 타입 선언을 대부분 추출해야 한다면 @types 의존성을 추가하는 것이 낫다.

//필수가 아닌 의존성을 분리할 때는 구조적 타이핑을 사용하면 된다.
//공개한 라이브러리를 사용하는 자바스크립트 사용자가 @types 의존성을 가지지 않게 해야 한다.
//웹 개발자가 NodeJS 관련된 의존성을 가지지 않게 해야 한다.