import React, { useEffect, useState, useRef } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import Pagination from '../../components/pagination/Pagination';

//Map - Leaflet kort
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
//map-icon
import icon from 'leaflet/dist/images/marker-icon.png'


let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [24, 36],
  iconAnchor: [12, 36]
})
L.Marker.prototype.options.icon = DefaultIcon;

const AarhusBycykel = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  //reference til map-container
  const mapRef = useRef()
  const markersLayerRef = useRef(null)

  useEffect(() => {

    makeRequest("https://admin.opendata.dk/api/3/action/datastore_search?resource_id=0807ae2e-7433-4f73-8b0a-3339ae894eb8")

  }, [])

  useEffect(() => {

    mapRef.current = L.map('mapcontainer').setView([56.153312034213634, 10.202264476218415], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapRef.current);

    /* let marker = L.marker([56.153312034213634, 10.202264476218415]).addTo(mapRef.current).bindPopup("hej", { autoClose: false }).openPopup(); */

    //DEfiner layer/lag til markører (så de kan slettes samlet)
    markersLayerRef.current = L.layerGroup().addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.off()
        mapRef.current = null
      }
    }

  }, [])

  const addMarkers = (coord, popupText) => {
    L.marker(coord).addTo(markersLayerRef.current).bindPopup(popupText, { offset: [0, -30] });
  }

  //slet laget med markører (inden der tilføjes nye markører)
  const clearMarkers = () => {
    markersLayerRef.current.clearLayers()
  }


  return (
    <>
      <h1>Bycykel</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {data && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} itemsTotal={data.result.records.length} />}

      {

        data && clearMarkers()
      }

      {
        data && data.result.records.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage).map(c => {

          //Lav en marker
          addMarkers([c.lat, c.lng], c.place)


          return (
            <article key={c._id}>
              <h2 >{c.place}</h2>
              <p>
                <a href={"https://www.google.com/maps/search/?api=1&query=" + c.lat + "," + c.lng} target='_blank'>se på kort </a>
              </p>

            </article >
          )
        }
        )
      }

      <div id='mapcontainer' style={{ width: "600px", height: "600px" }}>Kortet loader...</div>

    </>
  )
}

export default AarhusBycykel