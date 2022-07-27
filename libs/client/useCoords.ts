import { useEffect, useState } from "react";

interface UseCoordState {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  // 페이지가 처음 실행될 떄는 초기 상태값으로 실행됩니다.
  // 그 이유는 Next.js의 SSR떄문입니다.
  const [coords, setCoords] = useState<UseCoordState>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}
