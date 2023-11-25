import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

const Sidebar = () => {
  const { popularAnime } = useGlobalContext();

  const sorted = popularAnime?.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <div className="lg:w-1/4 px-4 hidden lg:block">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Top Five Popular</h3>

        {sorted?.slice(0, 5).map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="flex items-center mb-4">
            <img src={anime.images.jpg.large_image_url} alt={anime.title} className="w-12 h-12 object-cover rounded-lg mr-3" />
            <div className='border-b-2'>
              <h5 className="text-md font-medium">{anime.title}</h5>
              <p className="text-sm text-gray-500">{anime.score}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
