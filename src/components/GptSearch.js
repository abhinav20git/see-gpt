import React from 'react'
import GptMovieSuggestion from './GptMovieSuggestion'
import GptSearchBar from './GptSearchBar'
import { IMG_URL } from '../utils/constants'
const GptSearch = () => {
  return (
    <>
    
    <div className='fixed -z-10'>
        <img  className=' h-screen w-screen object-cover' src={IMG_URL} alt="background"/>
    </div>
    <div >
        <GptSearchBar/>
        <GptMovieSuggestion />
    </div>
    </>
  )
}

export default GptSearch