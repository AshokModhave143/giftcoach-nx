export const MAP_SETTINGS = {
  MAP_DEFAULT_OPTIONS: {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
    clickableIcons: false,
    scrollwheel: true,
    minZoom: 3,
    tilt: 0,
    draggable: true,
  } as google.maps.MapOptions,
  DEFAULT_ZOOM: 11,
  MARKER_SIZE: 35,
  PIXEL_OFFSET: {
    MARKER: {
      X: 0,
      Y: -35,
    },
  },
  DIRECTIONS_OPTIONS: { suppressMarkers: true, preserveViewport: true },
};
