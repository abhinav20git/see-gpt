import React from 'react'
import  lang  from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import  openai  from "../utils/openai"
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
const GptSearchBar = () => {
  const dispatch=useDispatch();
  const langKey=useSelector((store)=>store.config.lang);
  const searchText =useRef(null);
  //SEARCH MOVIE IN TMDB(return a promise)
  const searchMovieTMDB=async(movie)=>{
    const data=await fetch(
              'https://api.themoviedb.org/3/search/movie?query='+
               movie+
              '&include_adult=false&language=en-US&page=1',API_OPTIONS);
    const json=await data.json();
    return json.results;
  }

  const handleGptSearchClick=async()=>{
  console.log(searchText.current.value);
  //make an api call to get gpt api and get movie results

  const gptQuery="act as movie recommendation system and suggest some movie for my query :"
                  +searchText.current.value+
                  ".only give name of five movies,comma seperated like thee example result given ahead,example result:Gadar,Sholay,Don,Golmaal,Koi Mil Gya";

  const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
  });

  if(!gptResults.choices){
    //TODO:error handling
  }

  console.log(gptResults.choices?.[0]?.message?.content);
  const gptMovies=gptResults.choices?.[0]?.message?.content.split(',');
  //for each movie i will search tmdb api
  const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie));
  //resolve all promises 
  const tmdbResults=await Promise.all(promiseArray);
  //console.log(tmdbResults);
  dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
};

  return (

    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form  className='bg-black  w-full md:w-1/2 grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText}
        type="text"  
        placeholder={lang[langKey].langOfPlaceholder} 
        className=' border-none col-span-9 p-4 rounded-lg m-4  
        '/>
        <button className='rounded-lg bg-red-600 text-white py-2 m-4 px-4 col-span-3' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
   
  )
}

export default GptSearchBar


