import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostCard = ({ p }) => {
  return (
    <article key={p.id}>
      <h2 >{p.title}</h2>
      <p>{p.body.slice(0, 20)} ...</p>
      <Link to={"/post/" + p.id}>læs mere...</Link>

    </article>
  )
}

export default PostCard;