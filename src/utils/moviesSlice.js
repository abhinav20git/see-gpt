import { createSlice } from "@reduxjs/toolkit";

const moviesSlice=createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        highRatedMovies:null,
        upcomingMovies:null,
        trailerVideo:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },

        addPopularMovies:(state,action)=>{
            state.popularMovies=action.payload;
        },

        addHighRatedMovies:(state,action)=>{
            state.highRatedMovies=action.payload;
        },

        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies=action.payload;
        },

        addTrailerVideo:(state,action)=>{
            state.trailerVideo=action.payload;
        },
    }
});

export const {addNowPlayingMovies,addPopularMovies,addHighRatedMovies,addUpcomingMovies,addTrailerVideo}=moviesSlice.actions;

export default moviesSlice.reducer;