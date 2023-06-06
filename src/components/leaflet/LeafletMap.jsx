import { useEffect, useRef } from 'react'
import './leafletmap.scss'

//Map - Leaflet kort
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
//map-icon
import icon from 'leaflet/dist/images/marker-icon.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  className: 'markericon'
})
L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = ({ coordinates }) => {
  //Reference til mapcontainer
  const mapRef = useRef()
  //Reference til markør 
  const markerRef = useRef()


  useEffect(() => {

    if (!mapRef.current) {

      mapRef.current = L.map('mapcontainer').setView(coordinates, 12);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapRef.current);

      markerRef.current = L.marker(coordinates).addTo(mapRef.current)

    } else {
      mapRef.current.setView(coordinates, 13)
      markerRef.current.setLatLng(coordinates) //flyt markør
    }

  }, [coordinates])

  return (
    <div id='mapcontainer' style={{ width: '1100px', height: '500px' }}>kortet loader...</div>
  )
}

export default LeafletMap