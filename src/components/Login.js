import React from 'react'
import Header from './Header'
import {useState} from 'react';
const Login = () => {
  const [isSignInForm,setSignInForm]=useState();
  const toggleSignInForm=()=>{
    setSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header/>
    <div className='absolute'>
      <img  src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background image"/>
    </div>
    <form className="w-1/4 absolute bg-black bg-opacity-80 p-12 left-0 right-0 my-36 mx-auto text-white">
      <h1 className="font-bold text-3xl px-2 py-4">{isSignInForm ? "Sign In":"Sign Up"}</h1>
      {!isSignInForm && 
          <input type="text" placeholder="Enter Full Name" className='p-2 m-2 w-full bg-gray-700'/>
      }
      <input type="text" placeholder="Enter e-mail" className='p-2 m-2 w-full bg-gray-700'/>
      <input type="password" placeholder="Enter password" className='p-2 m-2 w-full bg-gray-700'/>
      <button className='p-4 m-2 w-full bg-red-700'>{isSignInForm? "Sign In":"Sign Up"}</button>
      <p className='p-2 m-2 text-0.5xl cursor-pointer' onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now":"Already a user?Sign In now." }</p>
    </form>
    </div>
  )
}

export default Login