import './App.css';
import React, { useEffect, useState } from 'react';
import Videogame from './components/Videogame';

const token = '3925d094b56b4718b74df426151cf755';
const currentPage = 1;
const test = `https://rawg.io/api/games?&key=${token}&page=${currentPage}&page_size=30`;
const searchtest = `https://rawg.io/api/games?&key=${token}&&page_size=30&search=`;


function App() {

  const [videogames, setVideogames ] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('');
  const [nextPage, setPage] = useState([]);

  useEffect( () => {
    fetch(test)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
      setPage(data.next);
    });

  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(searchtest + searchTerm)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
    });

    setSearchTerm('');

  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleButtonPress = (e) => {
    e.preventDefault();

    fetch(nextPage)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setVideogames(data.results);
      setPage(data.next);
    });

  }

  // const handleButtonChange = () => {
  //   setPage();
  // }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit} >
          <input className='searchbar' type='search' placeholder='Search' value={searchTerm} onChange={handleOnChange} />
        </form>
      </header>
      <div className='videogame-container'>
        {videogames.map(videogame => (<Videogame key={videogame.id} {...videogame} />))}
      </div>
      {/* <form onSubmit={handleButtonPress}> */}
        <button className='next-button' type='submit' onClick={handleButtonPress} >NEXT</button>
      {/* </form> */}
    </>
  )

};

export default App;
