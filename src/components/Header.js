import React from 'react'
import { useEffect } from 'react';
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { auth } from "../utils/firebase"; 
import { addUser,removeUser } from "../utils/userSlice.js"
import { LOGO } from  "../utils/constants.js";
const Header = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);

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
    
  return (
    <div className="absolute px-8 py-4 bg-gradient-to-b from-black z-20 w-screen flex justify-between ">
        <img className="w-44" src={LOGO}
             alt="logo"/>
    
    {user && (<div className='flex m-3'>
      <img  
        alt='icon'
        src={user?.photoURL}
        className='flex h-10 w-10'
        />
        <button className='text-white' onClick={handleSignOut} >Sign Out</button>
    </div>)}
    </div>
  )  
}

export default Header