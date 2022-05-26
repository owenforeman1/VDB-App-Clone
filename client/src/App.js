import './App.css';
import React, { useEffect, useState } from 'react';
import Videogame from './components/Videogame';
import Login from './components/Login';
import { Routes, Route, Router, NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem('id_token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const token = '3925d094b56b4718b74df426151cf755';
const test = `https://rawg.io/api/games?&key=${token}&page=1&page_size=15`;
const searchtest = `https://rawg.io/api/games?&key=${token}&page_size=15&search=`;


function App() {

  const [videogames, setVideogames ] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('');
  const [nextPage, setNextPage] = useState([]);
  const [prevPage, setPrevPage] = useState([]);

  useEffect( () => {
    fetch(test)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    });

  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(searchtest + searchTerm)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    });

    setSearchTerm('');

  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleNextButtonPress = (e) => {
    e.preventDefault();

    fetch(nextPage)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    });

  }

  const handlePrevButtonPress = (e) => {
    e.preventDefault();

    fetch(prevPage)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    });

  }

  

  return (
  <ApolloProvider client={client}>
    <>
      <header>
        <form onSubmit={handleOnSubmit} >
          <input className='searchbar' type='search' placeholder='Search' value={searchTerm} onChange={handleOnChange} />
        </form>
      </header>
      <div className='navbar'>

      </div>
      <div className='videogame-container'>
        {videogames.map(videogame => (<Videogame key={videogame.id} {...videogame} />))}
      </div>
      <div className='button-container'>
        <button className='previous-button' type='submit' onClick={handlePrevButtonPress} >PREV</button>
        <button className='next-button' type='submit' onClick={handleNextButtonPress} >NEXT</button>
      </div>
    </>
    </ApolloProvider>
  )

};

export default App;
