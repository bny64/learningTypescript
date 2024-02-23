//공식 명칭에는 상표를 붙이기

//구조적 타이핑의 특성 때문에 가끔 코드가 이상한 결과를 낼 수 있다.
interface Vector2D {
    x: number;
    y: number;
}

function calculateNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
}

calculateNorm({x: 3, y: 4})
const vec3D = {x:3, y:4, z: 1}
calculateNorm(vec3D);