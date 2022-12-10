export interface MuseumData {
  name: string;
  position: google.maps.LatLngLiteral;
}

export const museums: MuseumData[] = [
  {
    name: 'Hamburger Kunsthalle',
    position: { lat: 53.55674745629424, lng: 10.002396545723593 },
  },
  {
    name: 'German Historical Museum',
    position: { lat: 52.51823022299806, lng: 13.39694989857281 },
  },
  {
    name: 'The British Museum',
    position: { lat: 52.633392284804785, lng: -0.12003770548773834 },
  },
  {
    name: 'Louvre Museum',
    position: { lat: 48.86297399085735, lng: 2.3373843681422697 },
  },
  {
    name: 'Van Gough Museum',
    position: { lat: 52.37016007435205, lng: 4.901699141751193 },
  },
  {
    name: 'Museo Nacional del Prado',
    position: { lat: 40.414953005436075, lng: -3.6919729648241835 },
  },
  {
    name: 'National Archaeological Museum',
    position: { lat: 37.99043330407338, lng: 23.732574205404468 },
  },
  {
    name: 'Milan Natural History Museum',
    position: { lat: 45.47412946601384, lng: 9.20229385023787 },
  },
  {
    name: 'Museum National History',
    position: { lat: 48.206734688772926, lng: 16.359912051473867 },
  },
];

export const center: google.maps.LatLngLiteral = {
  lat: 49.513057,
  lng: 10.56472,
};

export const zoom = 5;
