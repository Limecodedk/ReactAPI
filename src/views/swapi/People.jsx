import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'



const People = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  const [page, setPage] = useState(1)

  useEffect(() => {

    makeRequest("https://swapi.dev/api/people/?page=" + page)

  }, [page])

  /*   console.log(data, isLoading, error) */

  return (
    <>
      <h1>SWAPI People</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {/* {
        data &&
        <>
          <button onClick={() => setPage(page + 1)} disabled={data.next ? false : true}>Vis næste side &gt;&gt;</button>
          <button onClick={() => setPage(page - 1)} disabled={data.next ? false : true}>&lt;&lt;Vis forrige side</button>
        </>
      } */}

      {
        data &&
        <>
          <div style={{ display: "flex", gap: "2px" }}>
            <button onClick={() => setPage(page - 1)} style={{ whiteSpace: "nowrap" }} disabled={data.previous ? false : true}>&lt;&lt;Forrige side</button>

            {
              [...Array(Math.ceil(data.count / data.results.length))].map((x, i) =>
                <button onClick={() => setPage(i + 1)}>{i + 1}</button>)
            }

            {/* 
            <button onClick={() => setPage(1)}>1</button>
            <button onClick={() => setPage(2)}>2</button>
            <button onClick={() => setPage(3)}>3</button>
            <button onClick={() => setPage(4)}>4</button>
            <button onClick={() => setPage(5)}>5</button>
            <button onClick={() => setPage(6)}>6</button>
            <button onClick={() => setPage(7)}>7</button>
            <button onClick={() => setPage(8)}>8</button>
            <button onClick={() => setPage(9)}>9</button> */}
            <button onClick={() => setPage(page + 1)} style={{ whiteSpace: "nowrap" }} disabled={data.next ? false : true}>Næste side &gt;&gt;</button>
          </div>
          <p>Side {page}</p>
        </>
      }

      {

        data && data.results.map((p, i) =>
          <article key={i}>
            <h2 >{p.name}</h2>
            <ul>
              <li>Højde: {p.height} cm</li>
              <li>Vægt: {p.mass} kg</li>
              <li>Hårfarve: {p.hair_color}</li>
              <li>Øjenfarve: {p.eye_color}</li>
            </ul>
          </article>

        )
      }


    </>
  )
}

export default People