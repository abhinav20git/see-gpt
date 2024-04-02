import React from 'react'
import Header from './Header.js'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies.js'
import usePopularMovies from '../hooks/usePopularMovies.js';
import useHighRatedMovies from '../hooks/useHighRatedMovies.js';
import MainContainer from "./MainContainer.js";
import SecondaryContainer from './SecondaryContainer.js';
import useUpcomingMovies from '../hooks/useUpcomingMovies.js';
import GptSearch from "./GptSearch.js"
import { useSelector } from 'react-redux';
const Browse = () => {
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch); 
  useNowPlayingMovies();
  usePopularMovies();
  useHighRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header/>
      { showGptSearch ? (<GptSearch/>):
          (
          <>
          <MainContainer/>
          <SecondaryContainer/>  
          </>
          )
      }
      
      
    </div>





  )
}

export default Browse