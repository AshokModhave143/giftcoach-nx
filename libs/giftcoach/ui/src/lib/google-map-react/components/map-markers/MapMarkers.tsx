import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import React, { cloneElement, isValidElement, PropsWithChildren } from 'react';

export interface MapMarkersProps extends PropsWithChildren {}

export const MapMarkers: React.FC<MapMarkersProps> = ({ children }) => {
  const map = useGoogleMap();

  return (
    <>
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, { map });
        }
        return null;
      })}
    </>
  );
};
