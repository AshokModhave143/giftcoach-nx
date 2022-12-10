export function createPopup(
  container: HTMLDivElement,
  position: google.maps.LatLng | google.maps.LatLngLiteral,
  pane: keyof google.maps.MapPanes,
  content: HTMLElement
) {
  class Popup extends google.maps.OverlayView {
    position: google.maps.LatLng | google.maps.LatLngLiteral;
    container: HTMLDivElement;
    pane: keyof google.maps.MapPanes;

    constructor(
      container: HTMLDivElement,
      position: google.maps.LatLng | google.maps.LatLngLiteral,
      pane: keyof google.maps.MapPanes,
      content: HTMLElement
    ) {
      super();
      this.container = container;
      this.position = position;
      this.pane = pane;

      content.classList.add('popup-bubble');

      // This zero-height div is positioned at the bottom of the bubble.
      const bubbleAnchor = document.createElement('div');

      bubbleAnchor.classList.add('popup-bubble-anchor');
      bubbleAnchor.appendChild(content);

      // This zero-height div is positioned at the bottom of the tip.
      this.container = document.createElement('div');
      this.container.classList.add('popup-container');
      this.container.appendChild(bubbleAnchor);

      // Optionally stop clicks, etc., from bubbling up to the map.
      Popup.preventMapHitsAndGesturesFrom(this.container);
    }

    /** Called when the popup is added to the map. */
    override onAdd() {
      const pane = this.getPanes()?.[this.pane];
      pane?.appendChild(this.container);
    }

    /** Called when the popup is removed from the map. */
    override onRemove() {
      if (this.container.parentElement) {
        this.container.parentElement.removeChild(this.container);
      }
    }

    /** Called each frame when the popup needs to draw itself. */
    override draw() {
      const projection = this.getProjection();
      const point = projection.fromLatLngToDivPixel(
        this.position as google.maps.LatLng
      );

      if (point === null) return;

      // Hide the popup when it is far out of view.
      const display =
        Math.abs(point.x) < 4000 && Math.abs(point.y) < 4000 ? 'block' : 'none';

      if (display === 'block') {
        this.container.style.left = point.x + 'px';
        this.container.style.top = point.y + 'px';
      }

      if (this.container.style.display !== display) {
        this.container.style.display = display;
      }
    }
  }
  return new Popup(container, position, pane, content);
}
