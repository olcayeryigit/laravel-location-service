import { Polyline } from "react-leaflet";

const RoutePolyline = ({ route }) => {
  if (!route || route.length <= 1) return null;

  return (
    <Polyline
      positions={route.map((loc) => [parseFloat(loc.latitude), parseFloat(loc.longitude)])}
      color="deepskyblue"
      weight={4}
    />
  );
};

export default RoutePolyline;
