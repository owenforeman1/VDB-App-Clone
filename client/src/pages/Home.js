import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Videogame from '../components/Videogame';

const token = '3925d094b56b4718b74df426151cf755';
const test = `https://rawg.io/api/games?&key=${token}&page=1&page_size=20`;
const searchtest = `https://rawg.io/api/games?&key=${token}&page=1&page_size=20&search=`;

const Home = () => {
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
    <div>
        <aside>
            <form onSubmit={handleOnSubmit} >
            <input className='searchbar' type='search' placeholder='Search' value={searchTerm} onChange={handleOnChange} />
            </form>
        </aside>

        <div className='videogame-container'>
            {videogames.map(videogame => 
                    (<Videogame key={videogame.id} {...videogame} />)
                )
            }
        </div>
        <div className='button-container'>
            <button className='previous-button' type='submit' onClick={handlePrevButtonPress} >PREV</button>
            <button className='next-button' type='submit' onClick={handleNextButtonPress} >NEXT</button>
      </div>
    </div>
    
  );  
};

export default Home;
