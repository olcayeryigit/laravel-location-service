import { FaRoute, FaTimes } from "react-icons/fa";

const RouteButtons = ({ fetchRoute, clearRoute, showRoute, locations }) => {
  return (
    <div className="flex justify-center my-4 gap-3 text-sm">
      <button
        onClick={fetchRoute}
        disabled={locations.length === 0 || showRoute}
        className={`px-5 py-2 flex items-center gap-2 rounded-lg text-white font-medium transition-all shadow-md ${
          showRoute
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        <FaRoute className="text-lg" />
        Calculate
      </button>

      <button
        onClick={clearRoute}
        disabled={!showRoute}
        className={`px-5 py-2 flex items-center gap-2 rounded-lg font-medium transition-all shadow-md ${
          !showRoute
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-500"
        }`}
      >
        <FaTimes className="text-lg" />
        Clear
      </button>
    </div>
  );
};

export default RouteButtons;

