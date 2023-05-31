import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const LoveCalculator = () => {
  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const handleClculation = (e) => {

    e.preventDefault()

    makeRequest("https://love-calculator.p.rapidapi.com/getPercentage",
      {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPIKEY,
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
      },
      {
        fname: fname,
        sname: sname
      })
  }

  return (
    <>
      <h1>Love Calculator &#128525;</h1>
      {isLoading && <Loader />}

      {error && <Error />}
      {
        data &&
        <article>
          <h2>{data.percentage} %</h2>
          <p>{data.fname} & {data.sname} <br />
            {data.result}
          </p>
        </article>
      }
      <form onSubmit={e => handleClculation(e)}>
        <input type="text" name="fname" id="fname" required placeholder='John' onChange={(e) => setFname(e.target.value)} />
        <input type="text" name="sname" id="sname" required placeholder='Alice' onChange={(e) => setSname(e.target.value)} />
        <button type='submit'>Se resultat</button>
      </form>
    </>
  )
}

export default LoveCalculator;