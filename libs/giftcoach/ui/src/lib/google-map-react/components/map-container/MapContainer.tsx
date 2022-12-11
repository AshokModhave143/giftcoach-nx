import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import React, {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
} from 'react';
import { MuseumData } from '../../data';
import { setMapWindowStyle } from '../../utils/mapWindowUtils';
import { MapCanvas } from '../map-canvas/MapCanvas';

export interface MapContainerProps extends PropsWithChildren {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  onChange?: () => void; // TODO: add params
  mapRef: (node: React.SetStateAction<HTMLDivElement | null>) => void;
  filteredMarkers: MuseumData[] | undefined;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  children,
  onClick,
  onChange,
  onIdle,
  mapRef,
  filteredMarkers,
}) => {
  const map = useGoogleMap();

  useEffect(() => {
    setMapWindowStyle(document);
  }, []);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) map.addListener('click', onClick);

      if (onIdle) map.addListener('idle', onIdle);

      if (onChange) map.addListener('bounds_changed', onChange);
    }
  }, [map, onClick, onIdle, onChange]);

  // Adjust zoom
  useEffect(() => {
    console.log('HOOK FOR BOUNDS=', map);
    if (map) {
      const bounds = new google.maps.LatLngBounds();

      console.log('ORIGINAL BOUNDS=', bounds);

      filteredMarkers?.forEach(({ position }) => {
        bounds?.extend(new google.maps.LatLng(position.lat, position.lng));
      });

      map.fitBounds(bounds);
      console.log('ENTENDED BOUNDS=', bounds);
    }
  }, [map, filteredMarkers]);

  return (
    <div id="container">
      <MapCanvas ref={mapRef} />
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, { map });
        }
        return null;
      })}
    </div>
  );
};
