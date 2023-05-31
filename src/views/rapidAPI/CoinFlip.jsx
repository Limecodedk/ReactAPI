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
    makeRequest("https://coin-flip1.p.rapidapi.com/headstails",
      {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'coin-flip1.p.rapidapi.com'
      })
  }

  return (
    <>
      <h1>Plat eller krone</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {
        data && <h2>{data.outcome}</h2>
      }
      <button onClick={handleNewFact}>Slå Plat eller krone</button>

    </>
  )
}

export default Facts