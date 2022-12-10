import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import React, { useEffect, useState } from 'react';
import { museums } from '../../data';

export const MapMarkers: React.FC<Record<string, unknown>> = () => {
  const map = useGoogleMap();

  const [, setMarkers] = useState<Array<google.maps.Marker>>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (!map) return () => {};

    const initialBounds = new google.maps.LatLngBounds();

    const museumMarkers: Array<google.maps.Marker> = museums.map((museum) => {
      const { position, name } = museum;

      const markerOptions: google.maps.MarkerOptions = {
        map,
        position,
        title: name,
        clickable: true,
      };

      initialBounds.extend(position);

      return new google.maps.Marker(markerOptions);
    });

    // Set the center of the map to fit markers
    map.setCenter(initialBounds.getCenter());

    setMarkers(museumMarkers);

    // Clean up markers
    return () => {
      museumMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map]);

  return null;
};
