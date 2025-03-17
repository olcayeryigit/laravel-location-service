import { FaSave, FaTimes } from "react-icons/fa";

const EditForm = ({ editLocation, onChange, onSubmit, onCancel }) => (
  <form
    onSubmit={onSubmit}
    className="mt-4 bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto"
  >
    {/* Başlık */}
    <h3 className="text-xl font-semibold text-green-400 text-center mb-4">
      Konumu Düzenle
    </h3>

    {/* Giriş Alanları */}
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          name="name"
          value={editLocation.name}
          onChange={onChange}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg shadow-sm"
          placeholder="Konum Adı"
          required
        />
        <input
          type="color"
          name="marker_color"
          value={editLocation.marker_color}
          onChange={onChange}
          className="w-14 h-12 cursor-pointer border border-gray-600  shadow-md"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="number"
          name="latitude"
          value={editLocation.latitude}
          onChange={onChange}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg shadow-sm"
          placeholder="Enlem"
          step="any"
          required
        />
        <input
          type="number"
          name="longitude"
          value={editLocation.longitude}
          onChange={onChange}
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 rounded-lg shadow-sm"
          placeholder="Boylam"
          step="any"
          required
        />
      </div>
    </div>

    {/* Butonlar */}
    <div className="flex justify-end gap-3 mt-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 flex items-center gap-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition shadow-sm"
      >
        <FaTimes size={18} /> Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 flex items-center gap-2 rounded-lg bg-green-600 text-white hover:bg-green-500 transition shadow-sm"
      >
        <FaSave size={18} /> Update
      </button>
    </div>
  </form>
);

export default EditForm;
