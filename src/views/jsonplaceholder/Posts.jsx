import React, { useEffect } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader'
import useRequestData from '../../hooks/useRequestData'
import PostCard from './PostCard';


const Posts = () => {

  //init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData()

  useEffect(() => {

    makeRequest("https://jsonplaceholder.typicode.com/posts/")


  }, [])

  console.log(data, isLoading, error)

  return (
    <>
      <h1>Posts fra JSONPlaceholder API</h1>
      {isLoading && <Loader />}

      {error && <Error />}

      {

        data && data.slice(0, 4).map(p =>
          <PostCard p={p} key={p.id} />
          /*  <article key={p.id}>
             <h2 >{p.title}</h2>
             <p>{p.body}</p>
           </article> */
        )
      }
    </>
  )
}

export default Posts