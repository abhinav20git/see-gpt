import React from 'react'
import { useSelector } from 'react-redux'
import MoviesList from './MoviesList';

const GptMovieSuggestion = () => {
  const gpt=useSelector((store)=>store.gpt);
  const {movieNames,movieResults}=gpt;
  if (!movieNames) return null;
  return (
    <div >
      <div className='p-4 m-4 bg-black text-white bg-opacity-90'>
        {movieNames.map((movieName,index)=>
        <MoviesList 
        key={movieName}
        title={movieName} 
        movies={movieResults[index]}/>
        )}
      </div>
    </div>
  )
}

export default GptMovieSuggestion