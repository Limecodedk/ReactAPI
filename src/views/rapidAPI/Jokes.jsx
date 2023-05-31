import React, { useEffect } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const Jokes = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const handleClculation = (e) => {

    e.preventDefault()

    makeRequest("https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes",
      {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
      })
  }

  return (
    <>
      <h1>Joke &#128514;</h1>
      {isLoading && <Loader />}

      {error && <Error />}
      {
        data &&
        <article>
          <p>{data[0].joke}</p>
        </article>
      }
      <form onSubmit={e => handleClculation(e)}>
        <button type='submit'>hit me</button>
      </form>
    </>
  )
}

export default Jokes;