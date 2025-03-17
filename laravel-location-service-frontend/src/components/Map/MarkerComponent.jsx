import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

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

export default MarkerComponent;
