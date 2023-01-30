import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import { MapContainer, MapContainerProps } from './components';
import { MAP_SETTINGS } from './MapSettings';

export interface GoogleMapReactProps extends PropsWithChildren {
  apiKey: string;
  onChange?: MapContainerProps['onChange'];
  onClick?: MapContainerProps['onClick'];
  onZoomChange?: MapContainerProps['onZoomChange'];
  onDragStart?: MapContainerProps['onDragStart'];
  onMapLoad?: (map: google.maps.Map) => void;
  center: google.maps.LatLngLiteral;
  zoom?: number;
  bounds?: google.maps.LatLngBoundsLiteral;
  children: React.ReactNode;
}

export const GoogleMapReact = ({
  apiKey,
  onChange,
  onClick,
  onZoomChange,
  onDragStart,
  onMapLoad,
  center,
  zoom,
  bounds,
  children,
}: GoogleMapReactProps) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | undefined>();

  const mapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setMapContainer(node);
    },
    []
  );

  const handleMapLoaded = useCallback(
    (map: google.maps.Map) => {
      setMap(map);

      if (bounds) {
        map.fitBounds(bounds);
      }
      onMapLoad?.(map);
    },
    [onMapLoad, bounds]
  );

  const mapOptions: google.maps.MapOptions = {
    mapId: 'map-view',
    center,
    zoom: zoom ?? MAP_SETTINGS.DEFAULT_ZOOM,
    ...MAP_SETTINGS.MAP_DEFAULT_OPTIONS,
  };

  return (
    <Box
      sx={{
        display: 'block',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        backgroundColor: 'lightblue',
      }}
    >
      <GoogleMapsProvider
        googleMapsAPIKey={process.env['NEXT_PUBLIC_GOOGLE_MAP_KEY'] ?? apiKey}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
        onLoadMap={handleMapLoaded}
        libraries={['places', 'marker']}
      >
        <React.StrictMode>
          <MapContainer
            {...{ onChange, onClick, onDragStart, onZoomChange, mapRef }}
          >
            {map && children}
          </MapContainer>
        </React.StrictMode>
      </GoogleMapsProvider>
    </Box>
  );
};

export * from './data';
export * from './components/custom-marker/CustomMarker';
export * from './MapSettings';
