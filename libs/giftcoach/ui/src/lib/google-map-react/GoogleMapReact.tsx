import React, { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import { MapContainer, CustomMarker } from './components';
import { MuseumData } from './data';
import { MAP_SETTINGS } from './MapSettings';

export interface GoogleMapReactProps {
  onChange?: () => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  onMarkerClick?: (payload: MuseumData) => void;
  markers?: MuseumData[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  highlightedMarketId?: string;
}

export const GoogleMapReact = ({
  onChange,
  onClick,
  onIdle,
  onMarkerClick,
  markers,
  center,
  zoom,
  apiKey,
  highlightedMarketId,
}: GoogleMapReactProps) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  const mapRef = useCallback(
    (node: React.SetStateAction<HTMLDivElement | null>) => {
      node && setMapContainer(node);
    },
    []
  );

  const filteredMarkers = useMemo(() => {
    return markers?.filter((m) => m.position.lat && m.position.lng);
  }, [markers]);

  const mapOptions: google.maps.MapOptions = {
    center,
    zoom,
    ...MAP_SETTINGS.MAP_DEFAULT_OPTIONS,
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        height: '100vh',
        width: '100%',
        backgroundColor: 'lightblue',
      }}
    >
      <GoogleMapsProvider
        googleMapsAPIKey={process.env['NEXT_PUBLIC_GOOGLE_MAP_KEY'] ?? apiKey}
        mapContainer={mapContainer}
        mapOptions={mapOptions}
      >
        <React.StrictMode>
          <MapContainer {...{ onChange, onIdle, onClick }} mapRef={mapRef}>
            {filteredMarkers &&
              filteredMarkers.map((marker: MuseumData) => (
                <CustomMarker
                  key={marker.name}
                  position={marker.position}
                  onClick={() => onMarkerClick && onMarkerClick(marker)}
                />
              ))}
          </MapContainer>
        </React.StrictMode>
      </GoogleMapsProvider>
    </Box>
  );
};

export * from './data';
