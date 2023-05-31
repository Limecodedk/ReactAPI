import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const Hobbies = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {
    handleNewHobbies()
  }, [])

  const handleNewHobbies = () => {
    makeRequest("https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies",
      {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'hobbies-by-api-ninjas.p.rapidapi.com'
      },
      {
        category: 'sports_and_outdoors'
      }
    )
  }

  return (
    <>
      <h1>Ninja - Hobbies &#128692;</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {
        data &&
        <article>
          <h2>{data.hobby}</h2>
          <a href={data.link} target='_blank' rel='noreferrer'>Læs mere</a>
        </article>
      }
      <button onClick={handleNewHobbies}>Ny Hobbie</button>

    </>
  )
}

export default Hobbies;