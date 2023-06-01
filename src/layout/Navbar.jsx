import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/posts">Posts</NavLink></li>
        <li className="dropdown">
          <span className="dropdown-toggle">SWAPI</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/people">SWAPI peopler</NavLink></li>
            <li><NavLink to="/starships">SWAPI starships</NavLink></li>
            <li><NavLink to="/species">SWAPI species</NavLink></li>
            <li><NavLink to="/person">Person</NavLink></li>
          </ul>
        </li>
        <li className="dropdown">
          <span className="dropdown-toggle">NEWSAPI</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/news1">News</NavLink></li>
            <li><NavLink to="/news2">Search News</NavLink></li>
          </ul>
        </li>
        <li className="dropdown">
          <span className="dropdown-toggle">RapidAPI</span>
          <ul className="dropdown-menu">

            <li><NavLink to="/hobbies">Hoobies</NavLink></li>
            <li><NavLink to="/lovecalculator">Love Calculator</NavLink></li>
            <li><NavLink to="/facts">Facts</NavLink></li> <br />
            <li><NavLink to="/joke">Jokes</NavLink></li>
            <li><NavLink to="/coinflip">Plat eller krone</NavLink></li>
          </ul>
        </li>
        <li className="dropdown">
          <span className="dropdown-toggle">OpenDataDk</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/bycykler">Bycykler</NavLink></li>
            <li><NavLink to="/bycyklermap">Bycykler Map</NavLink></li>
          </ul>
        </li>
        <li><NavLink to="/admin">Admin</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar