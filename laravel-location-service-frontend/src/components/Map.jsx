import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

const Map = ({location}) => {

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={location} icon={customIcon}>
        <Popup>Buradasın!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
