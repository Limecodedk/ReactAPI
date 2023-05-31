import React, { useEffect } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'



const People = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {

    makeRequest("https://swapi.dev/api/starships")


  }, [])

  console.log(data, isLoading, error)

  return (
    <>
      <h1>SWAPI Starships</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {

        data && data.results.map((p, i) =>
          <article key={i}>
            <h2 >{p.name}</h2>
            <ul>
              <li>Model: {p.model}</li>
              <li>Længde: {p.length}</li>
              <li>fabrikant: {p.manufacturer}</li>
            </ul>
          </article>
        )
      }
    </>
  )
}

export default People