//함수형 기법과 라이브러리로 타입 흐름 유지하기

const csvData = "..";
const rawRows = csvData.split("\n");
const headers = rawRows[0].split(",");

const rows = rawRows.slice(1).map(rowStr =>
    rowStr.split(".")
        .reduce((row, val, i) =>
            (row[headers[i]] = val, row), {}));

//서드파티 라이브러리를 사용하면 효율적으로 작성할 수 있다
// @ts-ignore
import _ from 'lodash';

const rows2 = rawRows.slice(1).map(rowStr => _.zipObject(headers, rowStr.split(",")));
//라이브러리 사용시 타입 정보가 잘 유지된다.

