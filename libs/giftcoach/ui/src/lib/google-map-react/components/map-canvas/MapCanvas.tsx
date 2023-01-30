import { styled } from '@mui/material';
import { forwardRef } from 'react';

export const MapCanvas = forwardRef<HTMLDivElement, Record<string, unknown>>(
  (_, ref) => <StyledDivCanvas ref={ref} />
);

export const StyledDivCanvas = styled('div')`
  height: 100%;
  width: 100%;
  position: absolute;
  box-sizing: 'border-box';
  overflow: 'hidden';
  overflow-x: 'auto';
  border-radius: '2px';
  box-shadow: '0 8px 16px rgb(0 0 0 / 24%)';
  transition: '0.2s ease left';
`;
