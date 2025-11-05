import { useEffect } from "react";

interface GyeongmaeMapProps {
  address: string;
}

const DEFAULT_LOCATION = {
  lat: 37.646454,
  lng: 127.040307,
};

export default function GyeongmaeMap({ address }: GyeongmaeMapProps) {
  useEffect(() => {
    if (!window.naver) return;

    window.naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        // 입력한 주소가 있는 경우
        if (status !== window.naver.maps.Service.Status.OK) {
          console.error("Geocoding failed:", status);

          // Fallback to default location
          const naverMap = new window.naver.maps.Map("map", {
            center: new window.naver.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng),
            zoom: 16,
          });

          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng),
            map: naverMap,
          });

          return;
        }

        // 잘못된 주소의 경우 기본 주소인 서울 시청으로 설정
        const result = response.v2.addresses[0];
        const lat = parseFloat(result.y);
        const lng = parseFloat(result.x);

        const naverMap = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(lat, lng),
          zoom: 16,
        });

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map: naverMap,
        });
      }
    );
  }, [address]);

  return <div id="map" style={{ width: "100%", aspectRatio: "343 / 180" }} />;
}
