import { FaRoute, FaTimes } from "react-icons/fa";

const RouteButtons = ({ fetchRoute, clearRoute, showRoute, locations }) => {
  return (
    <div className="flex justify-center my-4 gap-4">
      <button
        onClick={fetchRoute}
        disabled={locations.length === 0 || showRoute}
        className={`px-6 py-3 flex items-center gap-3 rounded-xl text-white font-semibold transition-all shadow-lg ${
          showRoute
            ? "bg-gray-500 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
        }`}
      >
        <FaRoute className="text-lg" />
        <span>Calculate Route</span>
      </button>

      <button
        onClick={clearRoute}
        disabled={!showRoute}
        className={`px-6 py-3 flex items-center gap-3 rounded-xl font-semibold transition-all shadow-lg ${
          !showRoute
            ? "bg-gray-500 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500"
        }`}
      >
        <FaTimes className="text-lg" />
        <span>Clear Route</span>
      </button>
    </div>
  );
};

export default RouteButtons;

