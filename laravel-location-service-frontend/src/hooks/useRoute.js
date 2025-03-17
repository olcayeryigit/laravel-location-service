import { useState } from "react";
import { calculateRoute } from "../services/routeService"; // Servis dosyasını import et

const useRoute = (locations) => {
  const [showRoute, setShowRoute] = useState(false);
  const [route, setRoute] = useState([]);

  const fetchRoute = async () => {
    if (locations.length === 0) return;

    const newRoute = await calculateRoute(locations[0].id);
    if (newRoute.length > 0) {
      setRoute(newRoute);
      setShowRoute(true);
    }
  };

  const clearRoute = () => {
    setShowRoute(false);
    setRoute([]);
  };

  return { showRoute, route, fetchRoute, clearRoute };
};

export default useRoute;
