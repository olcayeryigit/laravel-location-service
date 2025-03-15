import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { FaRoute, FaTimes } from "react-icons/fa";
import axios from "axios"; // Axios'u ekle

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const MarkerComponent = ({ location, index, showRoute }) => {
  const lat = parseFloat(location.latitude);
  const lng = parseFloat(location.longitude);
  const markerNumber = showRoute ? index + 1 : "";

  return (
    <Marker
      position={[lat, lng]}
      icon={L.divIcon({
        className: "custom-marker",
        html: `<div style="
          background-color: ${location.marker_color || "#4A90E2"};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          color: white;">
            ${markerNumber}
          </div>`,
      })}
    >
      <Popup className="text-sm">
        <strong>📍 {index + 1}. {location.name}</strong> <br />
        Koordinatlar: {lat}, {lng}
      </Popup>

      <Tooltip permanent direction="top" className="text-gray-200 bg-gray-800 px-2 py-1 rounded-md shadow-md">
        {location.name}
      </Tooltip>
    </Marker>
  );
};

const Map = ({ locations }) => {
  const defaultCenter = [40.7128, -74.006]; // Varsayılan merkez (New York)
  const [lastLocation, setLastLocation] = useState(defaultCenter);
  const [showRoute, setShowRoute] = useState(false);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (locations.length > 0) {
      const getLastLocation = locations.at(-1);
      if (getLastLocation) {
        setLastLocation([
          parseFloat(getLastLocation.latitude),
          parseFloat(getLastLocation.longitude),
        ]);
      }
    }
  }, [locations]);

  const fetchRoute = async () => {
    if (locations.length === 0) return;

    try {
      const startLocationId = locations[0].id; // Başlangıç noktası olarak ilk konumu al
      const response = await axios.post("http://localhost:8000/api/calculate-route", {
        start_location_id: startLocationId,
      });

      if (response.data.route) {
        setRoute(response.data.route);
        setShowRoute(true);
      }
    } catch (error) {
      console.error("Rota hesaplama hatası:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-full max-w-4xl mx-auto">
      <div className="flex justify-center my-4 gap-3">
        <button
          onClick={fetchRoute}
          className={`px-5 py-2 flex items-center gap-2 rounded-lg text-white font-semibold transition ${
            showRoute ? "bg-blue-500 shadow-lg scale-105" : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          <FaRoute />
          Rotayı Hesapla
        </button>
        <button
          onClick={() => {
            setShowRoute(false);
            setRoute([]);
          }}
          className="px-5 py-2 flex items-center gap-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition"
        >
          <FaTimes />
          Rotayı Temizle
        </button>
      </div>

      <MapContainer center={defaultCenter} zoom={8} className="h-[70vh] w-full rounded-lg shadow-md">
        <MapUpdater center={lastLocation} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations.map((location, index) => (
          <MarkerComponent key={index} location={location} index={index} showRoute={showRoute} />
        ))}

        {showRoute && route.length > 1 && (
          <Polyline
            positions={route.map((location) => [
              parseFloat(location.latitude),
              parseFloat(location.longitude),
            ])}
            color="deepskyblue"
            weight={4}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
