import React from 'react'

const LocationForm = () => {
  return (
    <form  className="space-y-4 p-4 bg-white rounded shadow">
      <input
        type="text"
        placeholder="Konum Adı"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Enlem (Lat)"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Boylam (Lng)"
        className="w-full p-2 border rounded"
      />
      <input
        type="color"
        className="w-full h-10"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
      </button>
    </form>
  )
}

export default LocationForm