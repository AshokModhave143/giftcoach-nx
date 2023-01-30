import { Box } from '@mui/material';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { MAP_SETTINGS } from '../../MapSettings';
import { setMapWindowStyle } from '../../utils/mapWindowUtils';
import { MapCanvas, StyledDivCanvas } from '../map-canvas/MapCanvas';
import { MapMarkers } from '../map-markers/MapMarkers';

export interface MapContainerProps extends PropsWithChildren {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onChange?: (bBox: google.maps.LatLngBounds) => void;
  onZoomChange?: (zoomType: ZOOM_TYPE) => void;
  onDragStart?: () => void;
  mapRef: (node: React.SetStateAction<HTMLDivElement | null>) => void;
}

const MAP_CHANGE_DEBOUNCE_TIME = 250;
type ZOOM_TYPE = 'in' | 'out';

const MAP_EVENTS: string[] = [
  'bounds_changed',
  'center_cahnged',
  'zoom_changed',
  'click',
  'dragstart',
  'dragend',
  'idle',
];

export const MapContainer: React.FC<MapContainerProps> = ({
  children,
  onClick,
  onChange,
  onZoomChange,
  onDragStart,
  mapRef,
}) => {
  const map = useGoogleMap();
  const [zoom, setZoom] = useState<number>(MAP_SETTINGS.DEFAULT_ZOOM);

  useEffect(() => {
    setMapWindowStyle(document);
  }, []);

  useEffect(() => {
    if (map) {
      let ignoreCenterChanged = false;

      const handleOnChangeCallback = () => {
        setTimeout(() => {
          if (!ignoreCenterChanged) {
            const bBox = map.getBounds();
            if (bBox && onChange) onChange(bBox);
          }
          ignoreCenterChanged = true;
        }, MAP_CHANGE_DEBOUNCE_TIME);
      };

      const handleOtherMapEvents = (
        event: string,
        isCenterChanged: boolean
      ) => {
        ignoreCenterChanged = isCenterChanged;
      };

      const listeners: Array<google.maps.MapsEventListener> = MAP_EVENTS.map(
        (eventName) => {
          switch (eventName) {
            case 'click':
              return map.addListener(
                eventName,
                (e: google.maps.MapMouseEvent | google.maps.IconMouseEvent) =>
                  onClick?.(e)
              );

            case 'dragstart':
              return map.addListener(eventName, () => {
                handleOtherMapEvents(eventName, true);
                onDragStart?.();
              });

            case 'zoom_changed':
              return map.addListener(eventName, () => {
                const newZoom = map.getZoom();

                newZoom && setZoom(newZoom);
                onZoomChange?.(zoom < Number(newZoom) ? 'in' : 'out');
              });

            case 'idle':
              return map.addListener(eventName, handleOnChangeCallback);

            default:
              return map.addListener(eventName, () =>
                handleOtherMapEvents(eventName, false)
              );
          }
        }
      );

      return () => {
        listeners.length && google?.maps?.event.clearInstanceListeners(map);
      };
    }
    return;
  }, [map]);

  return (
    <StyledDivCanvas id="map-container">
      <MapCanvas ref={mapRef} />
      <MapMarkers>{children}</MapMarkers>
    </StyledDivCanvas>
  );
};
