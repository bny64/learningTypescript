//사용할 때는 너그럽게, 생성할 때는 엄격하게

//함수의 매개변수는 타입의 범위가 넓어도 되지만, 결과를 반환할 때 일반적으로 타입의 범위는 더 구체적이어야 한다.
declare function setCamera(camera: CameraOptions): void;

declare function viewPortForBounds(bounds: LngLatBounds): CameraOptions;

interface CameraOptions {
    center?: LngLat;
    zoom?: number;
    bearing?: number;
    pitch?: number;
}

type LngLat = { lng: number, lat: number }
    | { lon: number; lat: number }
    | [number, number]

type LngLatBounds = { northeast: LngLat, southwest: LngLat } | [LngLat, LngLat] | [number, number, number, number]

// function focusOnFeature(f: Feature) {
//     const bounds = calculateBoundingBox(f);
//     const camera = viewPortForBounds(bounds);
//     setCamera(camera);
//     const {center: {lng, lat}, zoom} = camera;
//     zoom;
// }

//위 예제의 오류는 lat, lng 속성이 없고 zoom 속성만 존재한다.
//문제는 viewportForBounds의 타입 선언이 사용될 때뿐만 아니라 만들어질 때 너무 자유롭다.
//camera 값을 안전한 타입으로 사용하는 유일한 방법은 유니온 타입의 각 요소별로 코드를 분기하는 것이다.
//사용하기 편리한 API일수록 반환 타입이 엄격하다.

interface LngLat2 {
    lng: number;
    lat: number;
}

type LngLatLike = LngLat2 | { lon: number; lat: number; } | [number, number]

interface Camera2 {
    center: LngLat2;
    zoom: number;
    bearing: number;
    pitch: number;
}

interface CameraOptions extends Omit<Partial<Camera2>, 'center'> {
    center?: LngLatLike;
}


type LngLatBounds2 =
    { northeast: LngLatLike, southwest: LngLatLike }
    | [LngLatLike, LngLatLike]
    | [number, number, number, number]

declare function setCamera(camera: CameraOptions): void;

declare function viewportForBounds(bounds: LngLatBounds2): Camera2;

function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewportForBounds(bounds);
    setCamera(camera);
    const {center: {lng, lat}, zoom} = camera;
    zoom;
    //이제는 zoom 타입이 number | undefined가 아니라 number이다.
}
//bounds를 생성하는 다른 함수가 있다면 LngLatBounds와 LngLatBoundsLike를 구분할 수 있도록 해야한다.
//보통 매개변수 타입은 반환 타입에 비해 범위가 넓은 경향이 있다.
//선택적 속성과 유니온 타입은 반환 타입보다 매개 변수타입에 더 일반적이다.
//매개변수와 반환 타입의 재사용을 위해서 기본 형태(반환 타입)와 느슨한(매개변수)를 도입하는 것이 좋다.