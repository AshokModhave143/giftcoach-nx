import { render } from '@testing-library/react';

import { GoogleMapReact } from './GoogleMapReact';

describe('GoogleMapReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GoogleMapReact apiKey="" center={{ lat: 12, lng: 24 }} zoom={5} />
    );
    expect(baseElement).toBeTruthy();
  });
});
