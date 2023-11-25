import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function AnimeItem() {

    const {id} = useParams()
    console.log(id)

    //state

    const [anime, setAnime] = useState({});
    const[characters, setCharacters] = useState([])
    const[showMore, setShowMore] = useState(false)


    //destructure anime

   const{ title, synopsis, images,  trailer, score, scored_by, season, duration, source, rank, aired, popularity, status, rating } = anime

    //get anime based on id

    const getAnime = async (anime) =>{
        try{
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
            if(!response.ok){
                throw new Error("Network Response was not ok")
            }
        const data = await response.json();
        setAnime(data.data)
    }catch (error) {
        console.log("Error fetching anime", error);
    }
       
    }

   

    //get Characters

    const getCharacters = async (anime) =>{
        try{
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        if(!response.ok) {
            throw new Error("Network Response was not ok")
        }
        const data = await response.json()
        setCharacters(data.data)
        }catch(error) {
            console.log("Error fetching data", error)
        }
    }

    useEffect(() =>{
        getAnime(id)
        getCharacters(id)
    },[])
  return (
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="flex flex-col md:flex-row mb-6">
                <div className="md:w-1/2 pr-4">
                    <img src={images?.jpg.large_image_url} alt={title} className="w-full h-auto mb-4 rounded-lg" />
                    <p className="text-gray-600">
                        <span className="font-semibold">Aired:</span> {aired?.string}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Rating:</span> {rating}
                    </p>
                    <p><span>Rank:</span><span>{rank}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Scored by:</span><span>{scored_by}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Score:</span><span>{score}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Popularity:</span><span>{popularity}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Status:</span><span>{status}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Source:</span><span>{source}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Season:</span><span>{season}</span></p>
            <p className="text-gray-600"><span className='font-semibold'>Duration:</span><span>{duration}</span></p>
                </div>
                <div className="md:w-1/2 pl-4">
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Score:</span> {score}
                    </p>
                    {/* Other details */}
                </div>
            </div>
            <p className="text-gray-600 mb-4">
                {showMore ? synopsis : synopsis?.substring(0, 450) + '....'}
                <button className="text-blue-500 hover:underline ml-2" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less' : 'Read More'}
                </button>
            </p>
            {trailer?.embed_url && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Trailer</h3>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            title={title}
                            src={trailer?.embed_url}
                            frameBorder="0"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                    </div>
                </div>
            )}

<div className='cards'>
    <h3 className="text-2xl font-bold mb-4 mt-10">Characters</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((character, index) => {
            const { role } = character;
            const { name, images, mal_id } = character.character;
            return (
                <Link to={`/character/${mal_id}`} key={index} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                    <div className="p-4">
                        <img src={images?.jpg.image_url} alt={name} className="w-full h-48 object-cover mb-4" />
                        <h4 className="text-lg font-semibold mb-2 transition duration-300 hover:text-blue-500">{name}</h4>
                        <p className="text-gray-6000 transition duration-300 hover:text-gray-800">{role}</p>
                    </div>
                </Link>
            );
        })}
    </div>
</div>
        </div>
    </div>
);
}

export default AnimeItem
