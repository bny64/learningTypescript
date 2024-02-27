//공식 명칭에는 상표를 붙이기

//구조적 타이핑의 특성 때문에 가끔 코드가 이상한 결과를 낼 수 있다.
import {isBoolean} from "lodash";

interface Vector2D {
    x: number;
    y: number;
}

function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({x: 3, y: 4})
const vec3D = {x: 3, y: 4, z: 1}
calculateNorm(vec3D);

interface Vector2DBrand {
    _brand: '2d';
    x: number;
    y: number;
}

// 상표(_brand)를 사용해서 calculateNorm 함수가 Vector2D 타입만 받는 것을 보장한다.
// 상표기법은 타입 시스템에서 동작하지만 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있다.
// 런타임에는 절대 경로('/')로 시작하는지 체크하기는 쉽지만, 타입 시스템에서는 절대 경로를 판단하기 어렵기 때문에 상표 기법을 사용한다.
type AbsolutePath = string & { _brand: 'abs' };

function listAbsolutePath(path: AbsolutePath) {
}

function isAbsolutePath(path: string): path is AbsolutePath {
    return path.startsWith('/');
}

function f(path: string) {
    if (isAbsolutePath(path)) {
        listAbsolutePath(path);
    }
}

//상표 기법은 타입 시스템 내에서 표현할 수 없는 수 많은 속성들을 모델링하는데 사용된다.

type SortedList<T> = T[] & { _brand: 'sorted' };

function isSorted<T>(xs: T[]): xs is SortedList<T> {
    for (let i = 1; i < xs.length; i++) {
        if (xs[i] < xs[i - 1]) {
            return false;
        }
    }
    return true;
}

function binarySearch<T>(xs: SortedList<T>, x: T): boolean {
    return true;
}

// number타입에도 상표를 붙일 수 있다.
type Meter = number & { _brand: 'meters'; };

// 타입스크립트는 구조적 타이핑을 사용하기 때문에, 값을 세밀하게 구분하지 못하는 경우가 있다.
// 값을 구분하기 위해 공식 명칭이 필요하면 상표를 붙이는 것을 고려해야 한다.
// 상표 기법은 타입 시스템에는 동작하지만 런타임에 상표를 검사하는 것과 동일한 효과를 얻을 수 있다.