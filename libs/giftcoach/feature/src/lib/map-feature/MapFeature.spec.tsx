import { render } from '@testing-library/react';

import { MapFeature } from './MapFeature';

describe('MapFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MapFeature center={{ lat: 12, lng: 24 }} zoom={10} museums={[]} />
    );
    expect(baseElement).toBeTruthy();
  });
});
