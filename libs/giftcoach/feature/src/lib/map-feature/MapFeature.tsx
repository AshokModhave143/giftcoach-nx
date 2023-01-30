import { GoogleMapReact, GoogleMapReactProps, MuseumData } from '@giftcoach/ui';
import { CustomMarker } from '@giftcoach/ui';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface MapFeatureProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  museums: MuseumData[];
}

const googleMapKey = process.env['NEXT_PUBLIC_GOOGLE_MAP_KEY'] ?? '';
export const MapFeature: React.FC<MapFeatureProps> = ({
  center,
  zoom,
  museums,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(zoom);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(center);

  const handleOnMapChange: GoogleMapReactProps['onChange'] = (bBox) => {
    const mapViewBoundingBox = {
      neLatitude: bBox.getNorthEast().lat(),
      neLongitude: bBox.getNorthEast().lng(),
      swLatitude: bBox.getSouthWest().lat(),
      swLongitude: bBox.getSouthWest().lng(),
    };
    console.log('mapViewBoundingBox', mapViewBoundingBox);
  };

  const onClick = (
    e: google.maps.MapMouseEvent | google.maps.IconMouseEvent
  ) => {
    console.log(e);
    alert('Clicked me');
  };

  return (
    <GoogleMapReact
      apiKey={googleMapKey}
      onClick={onClick}
      center={mapCenter}
      zoom={zoomLevel}
      onChange={handleOnMapChange}
    >
      {museums.slice(0, 2).map((marker: MuseumData) => (
        <CustomMarker key={marker.name} position={marker.position} />
      ))}
    </GoogleMapReact>
  );
};
