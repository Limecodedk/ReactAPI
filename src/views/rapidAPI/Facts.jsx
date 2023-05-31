import React, { useEffect } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const Facts = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    handleNewFact()
  }, [])

  const handleNewFact = () => {
    makeRequest("https://facts-by-api-ninjas.p.rapidapi.com/v1/facts",
      {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'facts-by-api-ninjas.p.rapidapi.com'
      })
  }

  return (
    <>
      <h1>RapidAPI - Facts (ApiNinjas) - få en ligegyldig info&#129299;</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {

        data && data.slice(0, 4).map(f =>

          <article>
            <h2 >{f.fact}</h2>
          </article>
        )

      }

      {/*     {
        data && <h2>{data[0].fact}</h2>
      } */}
      <button onClick={handleNewFact}>Ny info</button>
      {/* <button onClick={() => handleNewFact()}>Ny info</button> */}
    </>
  )
}

export default Facts