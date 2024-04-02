import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector  } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice.js';
const useMovieTrailer=(movieId)=>{

  const dispatch=useDispatch();
  const trailerVideo=useSelector((store)=>store.movies.trailerVideo);
  //fetch trailer video and updating the store with trailer video data
  const getMovieVideos=async()=>{
    const data=await fetch("https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US", API_OPTIONS);
    const json=await data.json();
 
    //fetch trailer video
    const filterData=json.results.filter((video)=>video.type==="Trailer");
    const trailer=filterData.length ? filterData[0] : json.result[0];  //if there are multiple or no trailers for a movie

    dispatch(addTrailerVideo(trailer));
  }

  useEffect(()=>{
    !trailerVideo && getMovieVideos();
  },[]);


}

export default useMovieTrailer;