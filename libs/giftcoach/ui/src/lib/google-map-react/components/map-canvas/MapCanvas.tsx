import { forwardRef } from 'react';

export const MapCanvas = forwardRef<HTMLDivElement, Record<string, unknown>>(
  (_, ref) => (
    <div
      style={{ height: '100%', width: '100%', position: 'absolute' }}
      ref={ref}
    />
  )
);
