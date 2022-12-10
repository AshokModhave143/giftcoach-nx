import { Place } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import React from 'react';
import { OverlayView } from '../overlay-view/OverlayView';

export interface CustomMarkerProps extends ButtonProps {
  position: google.maps.LatLngLiteral;
  highlight?: boolean;
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  highlight,
  ...props
}) => {
  const map = useGoogleMap();

  return (
    <div>
      {map && (
        <OverlayView position={position} map={map} zIndex={highlight ? 99 : 0}>
          <Button variant="text" {...props}>
            <Place
              color="error"
              sx={{ backgroundColor: 'yellow', borderRadius: 50 }}
            />
          </Button>
        </OverlayView>
      )}
    </div>
  );
};
