// Separate file to parse the movie data from the api
// This is only to be used with movie data that is returned from the TMDB api

export const parseMovieData = (movieData, watchRegion) => {

    // Doing extra checks just in case to see if the data is valid
    if(!movieData || !movieData.id || !movieData.original_title || !movieData.genres || 
        !movieData.poster_path || !movieData.overview || !movieData.credits || 
        !movieData.credits.cast || !movieData.credits.crew){
        
        // Making the null movie to be returned
        const nullMovie = {
            state: false
        }

        return nullMovie;
    }

    // Initialize the data to be returned
    const parsedMovieData = {
        id: movieData.id,
        original_title: movieData.original_title,
        genres: movieData.genres,
        poster_path: movieData.poster_path,
        overview: movieData.overview,
    };


    // Retrieving the cast details from the object
    // Making the credits object template
    const credits = {
        director: '',
        actors: []
    }

    // Getting first 2 actors' names
    credits.actors = movieData.credits.cast.slice(0, 2).map((actor)=>actor.name);

    // Getting the director's name
    for(const member of movieData.credits.crew){
        if(member.job === 'Director'){
            credits.director = member.name;
            break;
        }
    }

    // Adding the cleaned and parsed credits to the movieInfo objectS
    parsedMovieData.credits = credits;

    // Adding the watch region with list of platforms to the movieInfo object
    const watchProviders = movieData["watch/providers"]?.results[watchRegion]?.flatrate;

    // Adding the watch region string to the movie object
    parsedMovieData.watchRegion = watchRegion;

    // Adding the watch providers list to the movieInfo object (may be undefined) -> Fine because it will just display an empty list
    parsedMovieData.watchProviders = watchProviders;

    // Setting the data as valid
    parsedMovieData.state = true;

    // Returning the parsed movie data
    return parsedMovieData;

};
