import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import useRequestData from '../../hooks/useRequestData';
import { formatDistance, formatDistanceToNow } from 'date-fns';
import { da } from 'date-fns/locale'

const News2 = () => {
  // init request-hook
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    if (searchQuery !== '') {
      makeRequest(
        `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedCategory}&q=${searchQuery}&apiKey=${process.env.REACT_APP_Newsapikey}`
      );
    }
  }, [selectedCountry, selectedCategory, searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(search);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <>
      <h1>Search News</h1>
      {isLoading && <Loader />}
      {error && <Error />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select category</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        <select name="country" id="country" onChange={handleCountryChange}>
          <option value="">Select country</option>
          <option value="ae">De Forenede Arabiske Emirater</option>
          <option value="ar">Argentina</option>
          <option value="at">Østrig</option>
          <option value="au">Australien</option>
          <option value="be">Belgien</option>
          <option value="bg">Bulgarien</option>
          <option value="br">Brasilien</option>
          <option value="ca">Canada</option>
          <option value="ch">Schweiz</option>
          <option value="cn">Kina</option>
          <option value="co">Colombia</option>
          <option value="cu">Cuba</option>
          <option value="cz">Tjekkiet</option>
          <option value="de">Tyskland</option>
          <option value="eg">Egypten</option>
          <option value="fr">Frankrig</option>
          <option value="gb">Storbritannien</option>
          <option value="gr">Grækenland</option>
          <option value="hk">Hongkong</option>
          <option value="hu">Ungarn</option>
          <option value="id">Indonesien</option>
          <option value="ie">Irland</option>
          <option value="il">Israel</option>
          <option value="in">Indien</option>
          <option value="it">Italien</option>
          <option value="jp">Japan</option>
          <option value="kr">Sydkorea</option>
          <option value="lt">Litauen</option>
          <option value="lv">Letland</option>
          <option value="ma">Marokko</option>
          <option value="mx">Mexico</option>
          <option value="my">Malaysia</option>
          <option value="ng">Nigeria</option>
          <option value="nl">Holland</option>
          <option value="no">Norge</option>
          <option value="nz">New Zealand</option>
          <option value="ph">Filippinerne</option>
          <option value="pl">Polen</option>
          <option value="pt">Portugal</option>
          <option value="ro">Rumænien</option>
          <option value="rs">Serbien</option>
          <option value="ru">Rusland</option>
          <option value="sa">Saudi-Arabien</option>
          <option value="se">Sverige</option>
          <option value="sg">Singapore</option>
          <option value="si">Slovenien</option>
          <option value="sk">Slovakiet</option>
          <option value="th">Thailand</option>
          <option value="tr">Tyrkiet</option>
          <option value="tw">Taiwan</option>
          <option value="ua">Ukraine</option>
          <option value="us">USA</option>
          <option value="ve">Venezuela</option>
          <option value="za">Sydafrika</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {data &&
        data.articles.map((n, index) => (
          <article key={"news" + index}>
            <h2>{n.title}</h2>

            <div>{new Date(n.publishedAt).toLocaleString("da-dk", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</div>
            <div><p>{formatDistanceToNow(new Date(n.publishedAt), { locale: da, addSuffix: true, includeSeconds: true })}</p></div>

            <div>
              {n.description} <a href={n.url} target="_blank">Læs mere</a>
            </div>
            {n.urlToImage && <img src={n.urlToImage} alt="Foto" />}
          </article>
        ))}
    </>
  );
};

export default News2;
