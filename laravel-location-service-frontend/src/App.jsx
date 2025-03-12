import LocationForm from "./components/LocationForm"
import LocationList from "./components/LocationList"
import Map from "./components/Map"


function App() {
  const locations = [
    { id: 1, lat: 41.0082, lng: 28.9784, name: 'Taksim', color: '#FF0000' },
    { id: 2, lat: 41.0390, lng: 28.9833, name: 'Beşiktaş', color: '#00FF00' },
    { id: 3, lat: 41.0138, lng: 28.9497, name: 'Karaköy', color: '#0000FF' },
  ]
  return (
    <div className="bg-black text-white">
    <Map location={[39.92077, 32.85411] } />
    <LocationList locations={locations}/>  
<LocationForm/>
    </div> 

  )
}

export default App
