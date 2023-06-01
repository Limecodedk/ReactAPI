import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const CurrentWeather = () => {
  const [zipcode, setZipcode] = useState('');
  const [search, setSearch] = useState('');

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    if (zipcode !== '') {
      makeRequest(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},dk&units=metric&appid=b79ca7f675fccf7dabb7eccc08c4d2b0`
      )
    }
  }, [zipcode])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length >= 4) {
      setZipcode(search);
    }
  };

  return (
    <>
      <h1>Vejr</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          minLength="4"
          maxLength="4"
          name="zipcode"
          id="zipcode"
          placeholder='Søg efter postnummer'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {data && (
        <article>
          {data.name}  <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
          <li>Temperatur: {Math.round(data.main.temp)}&deg; C</li>
          <li>Luftfugtighed: {Math.round(data.main.humidity)} %</li>
          <li>Vindhastighed: {Math.round(data.wind.speed)} m/s</li>
          <li> Vindretning: <span style={{ display: "inline-block", padding: "0 10px", transform: `rotate(${data.wind.deg}deg)` }}> ↑ </span>
            {data.wind.deg}
          </li >
        </article>
      )}
    </>
  )
}

export default CurrentWeather
