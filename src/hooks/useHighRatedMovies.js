import { useDispatch,useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {addHighRatedMovies} from "../utils/moviesSlice";
import { useEffect } from "react";
const useHighRatedMovies=()=>{

    const dispatch=useDispatch();
    const highRatedMovies=useSelector((store)=>store.movies.highRatedMovies);
    const getHighRatedMovies=async()=>{
        const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?&page=1',API_OPTIONS);
        const json=await data.json();
        dispatch(addHighRatedMovies(json.results));

    }
    useEffect(()=>{
        !highRatedMovies  && getHighRatedMovies();
    },[]);
}

export default useHighRatedMovies;