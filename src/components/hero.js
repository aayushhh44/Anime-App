(
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
            <p className="text-gray-600"><span>Scored by:</span><span>{scored_by}</span></p>
            <p className="text-gray-600"><span>Score:</span><span>{score}</span></p>
            <p className="text-gray-600"><span>Popularity:</span><span>{popularity}</span></p>
            <p className="text-gray-600"><span>Status:</span><span>{status}</span></p>
            <p className="text-gray-600"><span>Source:</span><span>{source}</span></p>
            <p className="text-gray-600"><span>Season:</span><span>{season}</span></p>
            <p className="text-gray-600"><span>Duration:</span><span>{duration}</span></p>
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
        </div>
    </div>
);