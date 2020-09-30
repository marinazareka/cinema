import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { getFilmInfo } from './filmSlice';
import { FilmContainer, Poster, Info, Title, Description } from './styled';

const Film: FunctionComponent = () => {
  const film = useSelector(getFilmInfo);

  return (
    <FilmContainer>
      <Poster>
        <img src={film.posterUrl} alt={film.title} />
      </Poster>
      <Info>
        <Title>{film.title}</Title>
        <Description>{film.annotation}</Description>
        <span>
          <b>Country: </b>
          {film.country.join(', ')}
        </span>
        <span>
          <b>Genre: </b>
          {film.genre.join(', ')}
        </span>
        <span>
          <span>
            {film.runtime}
          </span>
          <span>
            {film.imdbRating}
          </span>
        </span>
      </Info>
    </FilmContainer>
  );
};

export default Film;
