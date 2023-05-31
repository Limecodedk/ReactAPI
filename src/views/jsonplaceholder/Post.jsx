import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'

const Post = () => {

  const { id } = useParams()
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {

    makeRequest("https://jsonplaceholder.typicode.com/posts/" + id)

  }, [])


  return (
    <article>

      {isLoading && <Loader />}
      {error && <Error />}

      {
        data && <>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </>
      }
      <Link to='/posts'>Tilbage</Link>
    </article>
  )
}

export default Post