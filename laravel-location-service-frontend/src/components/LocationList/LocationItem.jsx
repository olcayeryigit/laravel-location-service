import { FaTrash } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";

const LocationItem = ({ location, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Bu konumu silmek istediğinize emin misiniz?")) {
      onDelete(location.id);
    }
  };

  return (
    <li className="flex items-center justify-between px-2 py-3 rounded-xl bg-gray-900 transition border border-gray-700 shadow-lg hover:shadow-xl">
      {/* Konum bilgisi */}
      <div className="flex items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-2 border-gray-400 shadow-md"
          style={{ backgroundColor: location.marker_color }}
        />
        <div>
          <p className="text-sm md:text-md font-medium text-white">{location.name}</p>
          <p className="mt-2 text-xs text-gray-400">{location.latitude}, {location.longitude}</p>
        </div>
      </div>

      {/* Aksiyon butonları */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(location)}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all shadow-md flex items-center justify-center"
        >
<img src="/assets/icons/edit.svg" className="w-5 h-5"/>

        </button>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all shadow-md flex items-center justify-center"
        >
<img src="/assets/icons/trash.svg" className="w-5 h-5"/>
          </button>
      </div>
    </li>
  );
};

export default LocationItem;
