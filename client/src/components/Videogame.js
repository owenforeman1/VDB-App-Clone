import React from 'react';

const Videogame = ({ name, background_image, esrb_rating, metacritic, parent_platforms, genres, released }) => (
<>
<div className='videogame'>

    <img src={background_image} alt={name} />
    <div className='videogame-info'>
        <h3>{name}</h3>
        <span className='metacritic-score'>{metacritic}</span>
    </div>

    <div className='videogame-overview'>
        <h2>Released:</h2>
        <span>{released}</span>
        <h2>Genres:</h2>
        <span>{genres.map(genre => <div>{genre.name}</div>)}</span>
    </div>

</div>
</>

)


export default Videogame;