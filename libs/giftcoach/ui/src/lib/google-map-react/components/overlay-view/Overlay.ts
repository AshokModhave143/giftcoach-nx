export function createOverlay(
  container: HTMLElement,
  pane: keyof google.maps.MapPanes,
  position: google.maps.LatLng | google.maps.LatLngLiteral
) {
  class Overlay extends google.maps.OverlayView {
    container: HTMLElement;
    pane: keyof google.maps.MapPanes;
    position: google.maps.LatLng | google.maps.LatLngLiteral;

    constructor(
      container: HTMLElement,
      pane: keyof google.maps.MapPanes,
      position: google.maps.LatLng | google.maps.LatLngLiteral
    ) {
      super();
      this.container = container;
      this.pane = pane;
      this.position = position;
    }

    override onAdd(): void {
      const pane = this.getPanes()?.[this.pane];
      pane?.appendChild(this.container);
    }

    override draw(): void {
      const projection = this.getProjection();
      const point = projection.fromLatLngToDivPixel(
        this.position as google.maps.LatLng
      );

      if (point === null) return;

      this.container.style.transform = `translate(${point.x}px, ${point.y}px)`;
    }

    override onRemove(): void {
      if (this.container.parentNode !== null)
        this.container.parentNode.removeChild(this.container);
    }
  }

  return new Overlay(container, pane, position);
}
