import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

const Gallery = () => {
  const { getAnimePictures, pictures } = useGlobalContext();
  const { id } = useParams();
  const [index, setIndex] = useState(0);

  const handleImageClick = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    getAnimePictures(id);
  }, [id, getAnimePictures]);

  return (
    <div className="flex flex-col items-center mt-8">
      <Link to="/" className="text-blue-500 hover:underline mb-8 text-lg">
        &larr; Back to Home
      </Link>

      <div className="max-w-4xl border rounded-md overflow-hidden shadow-lg transition duration-300 transform hover:scale-105">
        <img src={pictures[index]?.jpg.image_url} alt="" className="w-full" />
      </div>

      <div className="flex flex-wrap mt-6 gap-4">
        {pictures.map((picture, i) => (
          <div
            onClick={() => handleImageClick(i)}
            className="cursor-pointer overflow-hidden border rounded-md shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
            key={i}
          >
            <div></div>
            <img src={picture.jpg.image_url} style ={{border: i === index ? "3px solid #27AE60": "3px solid #e5e7eb"}} alt="" className="w-12 sm:w-full h-24 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
