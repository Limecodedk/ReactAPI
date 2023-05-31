import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import useRequestData from '../../hooks/useRequestData';

const News1 = () => {
  // init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      makeRequest(
        `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAtcountry=us&apiKey=${process.env.REACT_APP_Newsapikey}`
      );
    }
  }, [searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(search);
  };

  return (
    <>
      <h1>NewsAPI</h1>
      {isLoading && <Loader />}
      {error && <Error />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Søg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Søg...</button>
      </form>

      {data &&
        data.articles.map((n) => (
          <article key={n.id}>
            <h2>{n.title}</h2>
            <p>{n.publishedAt}</p>
            <div>
              {n.description} <a href={n.url} target="_blank">Læs mere</a>
            </div>
            {n.urlToImage && <img src={n.urlToImage} alt="Foto" />}
          </article>
        ))}
    </>
  );
};

export default News1;
