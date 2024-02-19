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

function focusOnFeature(f: Feature) {
    const bounds = calculateBoundingBox(f);
    const camera = viewPortForBounds(bounds);
    setCamera(camera);
    const {center: { lng, lat }, zoom} = camera;
    zoom;
}