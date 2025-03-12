const LocationList = ({ locations }) => {
    return (
      <div className="space-y-2 p-4 bg-black rounded shadow">
        {locations.map((loc) => (
          <div key={loc.id} className="flex items-center p-2 border-b">
            <span className="font-bold">{loc.name}</span> - ({loc.lat}, {loc.lng})
            <div className="w-4 h-4 inline-block ml-2" style={{ backgroundColor: loc.color }}></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LocationList;