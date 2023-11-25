import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import Sidebar from './Sidebar';

function Popular({ rend }) {
  const { popularAnime, isSearch, serachResults } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch && rend === 'popular') {
      return popularAnime?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="link">
            <div className="card">
              <img src={anime.images.jpg.large_image_url} alt="" />
              <h2 className="mt-4 mb-2 text-lg font-semibold">{anime.title}</h2>
            </div>
          </Link>
        );
      });
    } else {
      return serachResults?.map((anime) => {
        return (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
          </Link>
        );
      });
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center">{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
}

export default Popular;
