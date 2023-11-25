import React, { useState } from 'react';
import { useGlobalContext } from '../context/global';
import AiringAnime from './AiringAnime';
import Popular from './Popular';
import UpcomingAnime from './UpcomingAnime';

function Homepage() {
  const { handleSubmit, search, handleChange, getAiringAnime, getPopularAnime, getUpcomingAnime } = useGlobalContext();
  const [rend, setRend] = useState('popular');

  const switchComponent = () => {
    switch (rend) {
      case 'popular':
        return <Popular rend={rend} />;
      case 'upcoming':
        return <UpcomingAnime rend={rend} />;
      case 'airing':
        return <AiringAnime rend={rend} />;
      default:
        return <Popular rend={rend} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center sm:items-stretch">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">
            {rend === 'popular' ? 'Popular Anime' : rend === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
          </h1>
          <div className="space-x-4 mt-4 sm:mt-0">
            <button
              className={`px-2  lg:px-4 py-1 ${rend === 'popular' ? 'bg-gray-800' : 'bg-gray-300'} text-white rounded`}
              onClick={() => {
                setRend('popular');
                getPopularAnime();
              }}
            >
              Popular<i className='fas fa-fire'></i>
            </button>
            <button
              className={`px-2 lg:px-4 py-1 ${rend === 'airing' ? 'bg-gray-800' : 'bg-gray-300'} text-white rounded`}
              onClick={() => {
                setRend('airing');
                getAiringAnime();
              }}
            >
              Airing
            </button>
            <button
              className={`px-2 lg:px-4 mt-4  sm:mt-0 py-1 ${rend === 'upcoming' ? 'bg-gray-800' : 'bg-gray-300'} text-white rounded`}
              onClick={() => {
                setRend('upcoming');
                getUpcomingAnime();
              }}
            >
              Upcoming
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-8 flex flex-col items-center">
        <form className="mb-4 flex flex-col sm:flex-row" onSubmit={handleSubmit}>
          <div className="flex-grow mb-4 sm:mb-0 sm:mr-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-l-xl sm:rounded-none sm:rounded-l-xl"
              type="text"
              placeholder="Search Anime..."
              value={search} // Make sure 'search' is coming from the context
              onChange={handleChange} // Ensure 'handleChange' is coming from the context
            />
          </div>
          <button
            className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-r-xl sm:rounded-none sm:rounded-r-xl"
            type="submit" // Change the type to "submit"
          >
            Search
          </button>
        </form>

        <div className="w-full">{switchComponent()}</div>
      </div>
    </div>
  );
}

export default Homepage;
