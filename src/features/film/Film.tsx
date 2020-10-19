import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-solid-svg-icons';
import { getFilmInfo, getStatus } from './filmSlice';
import { FilmContainer, Poster, Info, Title, Description, Detail } from './styled';
import { Status } from '../../types/types';

const Film: FunctionComponent = () => {
  const film = useSelector(getFilmInfo);
  const status = useSelector(getStatus);

  return (
    <FilmContainer>
      {status === Status.Complete && (
        <>
          <Poster>
            <img src={film.posterUrl} alt={film.title} />
          </Poster>
          <Info>
            <Title>{film.title}</Title>
            <Description>{film.annotation}</Description>
            <Detail>
              <b>Country: </b>
              {film.country.join(', ')}
            </Detail>
            <Detail>
              <b>Genre: </b>
              {film.genre.join(', ')}
            </Detail>
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
