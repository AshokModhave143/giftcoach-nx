import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { createOverlay } from './Overlay';

export type OverlayViewProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  pane?: keyof google.maps.MapPanes;
  map: google.maps.Map;
  zIndex?: number;
}>;

export function OverlayView({
  position,
  pane = 'floatPane',
  map,
  zIndex,
  children,
}: OverlayViewProps) {
  const container = useMemo(() => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    return div;
  }, []);

  const overlay = useMemo(() => {
    return createOverlay(container, pane, position);
  }, [container, pane, position]);

  useEffect(() => {
    overlay?.setMap(map);
    return () => overlay?.setMap(null);
  }, [map, overlay]);

  useEffect(() => {
    container.style.zIndex = `${zIndex}`;
  }, [zIndex, container]);

  return createPortal(children, container);
}
