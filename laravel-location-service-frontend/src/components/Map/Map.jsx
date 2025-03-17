import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";

import MarkerComponent from "./MarkerComponent";
import RouteButtons from "./RouteButtons";
import RoutePolyline from "./RoutePolyline";
import MapUpdater from "./MapUpdater";
import useRoute from "../../hooks/useRoute";

const Map = ({ locations }) => {
  const defaultCenter = [40.7128, -74.006]; // Varsayılan merkez (New York)
  const [lastLocation, setLastLocation] = useState(defaultCenter);
  const { showRoute, route, fetchRoute, clearRoute } = useRoute(locations);

  useEffect(() => {
    if (locations.length > 0) {
      const lastLoc = locations.at(-1);
      if (lastLoc) {
        setLastLocation([parseFloat(lastLoc.latitude), parseFloat(lastLoc.longitude)]);
      }
    }
  }, [locations]);

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Location Service</h2>

      <RouteButtons fetchRoute={fetchRoute} clearRoute={clearRoute} showRoute={showRoute} locations={locations} />

      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-700">
        <MapContainer center={defaultCenter} zoom={8} className="h-[70vh] w-full">
          <MapUpdater center={lastLocation} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {locations.map((location, index) => (
            <MarkerComponent key={index} location={location} index={index} showRoute={showRoute} />
          ))}

          {showRoute && <RoutePolyline route={route} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
