import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getFilmInfo, getFilmStatus } from './filmSlice';
import { FilmContainer, Info, Title, Description, Detail } from './styled';
import { Status } from '../../types/types';

const Film: FunctionComponent = () => {
  const film = useSelector(getFilmInfo);
  const status = useSelector(getFilmStatus);

  return (
    <FilmContainer>
      {status === Status.Complete && (
        <>
          <div>
            <img src={film.posterUrl} height="300px" width="203px" alt={film.title} />
          </div>
          <Info>
            <Title>{film.title}</Title>
            <Description>{film.annotation}</Description>
            {film.country.length && (
              <Detail>
                <b>Country: </b>
                {film.country.join(', ')}
              </Detail>
            )}
            {film.genre.length && (
              <Detail>
                <b>Genre: </b>
                {film.genre.join(', ')}
              </Detail>
            )}
            <Detail>
              <Detail>
                <FontAwesomeIcon icon={faClock} />
                {film.runtime}
              </Detail>
              <Detail>
                <FontAwesomeIcon icon={faHeart} />
                {film.imdbRating}
              </Detail>
            </Detail>
          </Info>
        </>
      )}
    </FilmContainer>
  );
};

export default React.memo(Film);
