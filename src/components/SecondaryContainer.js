import React from 'react';
import {useSelector} from 'react-redux'
import MoviesList from './MoviesList';
const SecondaryContainer=()=>{
    const movies=useSelector((store)=>store.movies);
    return(
        // movies.nowPlayingMovies &&
        // (
        <div className=" bg-black">
            <div className="-mt-52 relative z-20 pl-6">
            <MoviesList title={'Now playing'} movies={movies.nowPlayingMovies}/>
            <MoviesList title={'Popular'} movies={movies.popularMovies}/>
            <MoviesList title={'High Rated'} movies={movies.highRatedMovies}/>
            <MoviesList title={'Upcoming Movies'} movies={movies.upcomingMovies}/>
            
            </div>
        </div>
        // )
    )
}

export default SecondaryContainer;