import { GoogleMapReact, MuseumData } from '@giftcoach/ui';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface MapFeatureProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  museums: MuseumData[];
}

export const MapFeature: React.FC<MapFeatureProps> = ({
  center,
  zoom,
  museums,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(zoom);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(center);

  const onIdle = (map: google.maps.Map) => {
    if (map) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setZoomLevel(map.getZoom()!);
      const nextCenter = map.getCenter();
      console.log(nextCenter);
      if (nextCenter) setMapCenter(nextCenter.toJSON());
    }
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    console.log(e);
    alert('Clicked me');
  };

  return (
    <GoogleMapReact
      apiKey=""
      onIdle={onIdle}
      onClick={onClick}
      center={mapCenter}
      zoom={zoomLevel}
      markers={museums}
    />
  );
};
