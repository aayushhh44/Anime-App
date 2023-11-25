// UpcomingAnime.js (or Upcoming.js)
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

function UpcomingAnime({ rend }) {
  const { upComingAnime, isSearch, searchResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rend === 'upcoming') {
      return upComingAnime.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="link">
          <div className="card">
            <img src={anime.images.jpg.large_image_url} alt="" />
            <h2 className="mt-4 mb-2 text-lg font-semibold">{anime.title}</h2>
          </div>
        </Link>
      ));
    } else {
      return searchResults.map((anime) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
          <img src={anime.images.jpg.large_image_url} alt="" />
        </Link>
      ));
    }
  };

  return <div className="flex flex-wrap justify-center">{conditionalRender()}</div>;
}

export default UpcomingAnime;
