import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import LeafletMap from '../../components/leaflet/LeafletMap';

const CurrentWeatherDawaMap = () => {
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()
  //reques hook - Dawa
  const { data: dataDAWA, isLoading: isLodingDAWA, error: errorDAWA, makeRequest: makeRequestDAWA } = useRequestData()

  useEffect(() => {
    if (zipcode.length === 4 && !isNaN(zipcode)) {
      makeRequest(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},dk&units=metric&appid=${process.env.REACT_APP_OPENWEATHERKEY}`
      )
    } else {
      makeRequestDAWA(
        "https://api.dataforsyningen.dk/postnumre/autocomplete?&q=" + zipcode
      )
    }
  }, [zipcode])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length === 4) {
      setZipcode(search);
    }
  };

  return (
    <>
      <h1>Vejr med maps</h1>
      {isLoading && <Loader />}
      {error && <Error />}

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
          {data.name}  <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
          <li>Temperatur: {Math.round(data.main.temp)}&deg; C</li>
          <li>Luftfugtighed: {Math.round(data.main.humidity)} %</li>
          <li>Vindhastighed: {Math.round(data.wind.speed)} m/s</li>
          <li> Vindretning: <span style={{ display: "inline-block", padding: "0 10px", transform: `rotate(${data.wind.deg}deg)` }}> ↓ </span>
            {data.wind.deg}
          </li >
          <li>Sol op&#9728;: kl. {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
          <li>Sol ned &#127766;:  kl. {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
        </article>
      )}
      {
        data && <LeafletMap coordinates={[data.coord.lat, data.coord.lon]} />
      }

    </>
  )
}

export default CurrentWeatherDawaMap
