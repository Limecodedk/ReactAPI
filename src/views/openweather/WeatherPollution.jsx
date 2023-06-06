import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import LeafletMap from '../../components/leaflet/LeafletMap';

const CurrentWeatherDawaMap = () => {
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  //reques hook - Dawa
  const { data: dataDAWA, isLoading: isLodingDAWA, error: errorDAWA, makeRequest: makeRequestDAWA } = useRequestData()

  //find info om post nummer
  //OpenWeathermap geo

  /* useEffect(() => {
    makeRequest(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERKEY}`
    )
  }, [lon, lat]) */

  /*   useEffect(() => {
      if (zipcode.length === 4) {
        makeRequestDAWA(
          `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},dk&appid=${process.env.REACT_APP_OPENWEATHERKEY}`
        )
      }
    }, [zipcode]) */

  //DAWA  
  useEffect(() => {
    if (zipcode.length === 4 && dataDAWA[0]) {
      makeRequest(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERKEY}`
      )
    } else {
      makeRequestDAWA(
        //find info om post nummer
        // Dawa
        "https://api.dataforsyningen.dk/postnumre/autocomplete?&q=" + zipcode
      )
    }
  }, [zipcode])
  //Lytter på data i dataZip - som opdateres efter kald til geodata (postnummer sendes med.)
  useEffect(() => {
    if (dataDAWA) {
      setLat(dataDAWA[0].postnummer.visueltcenter_x)
      setLon(dataDAWA[0].postnummer.visueltcenter_y)
    }
  }, [dataDAWA])
  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length === 4) {
      setZipcode(search);
    }
  };
  return (
    <>
      <h1>Air Pollution</h1>
      {isLoading && isLodingDAWA && < Loader />}
      {error && errorDAWA && < Error />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          minLength="4"
          maxLength="4"
          name="zipcode"
          autoComplete='off'
          id="zipcode"
          list='adresseforslag'
          placeholder='Søg efter postnummer'
          onChange={(e) => setZipcode(e.target.value)}
        />
        <datalist id='adresseforslag'>
          {
            dataDAWA && dataDAWA.map(a => <option value={a.postnummer.nr}>{a.tekst}</option>)
          }
        </datalist>
      </form>
      {data && (
        <article>
          {dataDAWA[0].postnummer.navn}
          <li>Kulilte {Math.round(data.list[0].components.co)}</li>
          <li>Kvælstofdioxid {data.list[0].components.no2}</li>
          <li>Ozon {data.list[0].components.o3}</li>
          <li>Svovldioxid (Sulfur dioxide) {data.list[0].components.so2}</li>
          <li>Ammoniak {data.list[0].components.nh3}</li>
          <li>Ammoniak {data.list[0].components.nh3}</li>
        </article>
      )}

    </>
  )
}
export default CurrentWeatherDawaMap