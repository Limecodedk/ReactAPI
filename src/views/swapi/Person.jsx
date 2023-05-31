import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'


const Person = () => {
  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [personID, setPersonID] = useState(1);


  useEffect(() => {

    makeRequest("https://swapi.dev/api/people/" + personID)

  }, [personID])

  return (
    <>

      {error && <Error />}
      {isLoading && <Loader />}

      {data && <h2>{data.name}</h2>}

      <input type="text" placeholder='Skriv et ID' onInput={(e) => setPersonID(e.target.value)} />

    </>
  )
}

export default Person