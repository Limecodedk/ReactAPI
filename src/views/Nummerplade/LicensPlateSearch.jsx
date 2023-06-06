import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { da } from 'date-fns/locale'

const LicensPlateSearch = () => {
  const [licensNumber, setLicensNumber] = useState('');
  const [search, setSearch] = useState('');

  // init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    if (licensNumber !== '') {
      makeRequest(
        `https://v1.motorapi.dk/vehicles/${licensNumber}`,
        {
          'X-AUTH-TOKEN': `${process.env.REACT_APP_Nummerplade}`,
        }
      )
    }
  }, [licensNumber])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (search.length === 7) {
      setLicensNumber(search);
    }
  };

  const lavDato = (d) => {
    let year = d.slice(0, 4)
    let md = d.slice(5, 7) - 1
    let day = d.slice(8, 10)
    return (new Date(year, md, day).toLocaleString("da-dk", { year: 'numeric', month: 'long', day: 'numeric' }))
  }
  return (
    <>
      <h1>Søg efter nummerplade</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          minLength="7"
          maxLength="7"
          name="LicensPlateNumber"
          id="LicensPlateNumber"
          placeholder='Indtast nummerplade'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {data && (
        <article>
          <div className='nummerpladeImg'>
            <p>{data.registration_number}</p>
          </div>
          <li>Mærke: {data.make}</li>
          <li>Model: {data.model}</li>
          <li>Motor variant: {data.variant}</li>
          <li>Status: {data.status}</li>
          <li>Status dato: {lavDato(data.status_date)}</li>
          <li>Drivekraft: {data.fuel_type}</li>
          <li>Color: {data.color}</li>
          <br />
          {data.is_leasing === true ? (
            <div>
              <p > <span className='leasing'>Bilen er leaset!</span> I perioden:<br />
                {lavDato(data.leasing_from)} <br />
                {lavDato(data.leasing_to)}</p>
            </div>
          ) : (
            <p>Bilen er ikke leaset</p>
          )}
        </article>

      )}
    </>
  )
}

export default LicensPlateSearch
