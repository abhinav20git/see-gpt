import React from 'react'
import { useEffect } from 'react';
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { auth } from "../utils/firebase"; 
import { addUser,removeUser } from "../utils/userSlice.js"
import { LOGO, SUPPORTED_LANGUAGES } from  "../utils/constants.js";
import { toggleGptSearchView } from '../utils/gptSlice.js';
import { changeLanguage }  from "../utils/configSlice.js";
// import {showGptSearch} from "../utils/gptSlice.js";

const Header = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
  const handleSignOut=()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      navigate('/error');
    });
  }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) { 
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unsubscribe();
  },[]);

  const handleGptSearchClick=()=>{
    //toggle gpt search
    dispatch(toggleGptSearchView());
  }
  const handleLanguagechange=(e)=>{
    dispatch(changeLanguage(e.target.value));
    
  };  
  return (
    <div className=" absolute px-0 py-0 bg-gradient-to-b from-black z-20 w-screen flex flex-col md:flex-row justify-between  sm:bg-blue-900 md:bg-green-900 ">
        <img className="w-44 h-20 mx-auto ml-24 md:mx-0" src={LOGO}
             alt="logo"/>
    
    {user && (<div className='flex m-3 text-align-center'>
      {showGptSearch && <select className='bg-gray-600 p-2 h-10 m-2 text-white' onChange={handleLanguagechange}>
        {SUPPORTED_LANGUAGES.map(lang=>
        <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
      }
      </select>}
      <button className='text-white bg-red-600 h-10 p-2 m-2 mr-4 rounded ' onClick={handleGptSearchClick}>
        {showGptSearch ? "Homepage":"GptSearch"}</button>
      <img  
        alt='icon'
        src={user?.photoURL}
        className='flex h-10 w-10 m-2'
        />
        <button className='text-white m-2 flex bg-red-600 h-10 w-15 text-xs p-2 rounded' onClick={handleSignOut} >Sign Out</button>
    </div>)}
    </div>
  )  
}

export default Header