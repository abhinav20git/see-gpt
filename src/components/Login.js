import React from 'react'
import Header from './Header'
import {useState,useRef} from 'react';
import {checkValidData} from '../utils/validate.js';
import {auth} from "../utils/firebase.js";
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         updateProfile
       } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addUser} from "../utils/userSlice.js"

const Login = () => {
  

  const toggleSignInForm=()=>{
    setSignInForm(!isSignInForm);
  }
  const [isSignInForm,setSignInForm]=useState(true);
  const[errorMessage,setErrorMessage] = useState(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);
  const handleBtnClick=()=>{
  const message= checkValidData(email.current.value,password.current.value);
  setErrorMessage(message);
  
  if(message) return;

  if(!isSignInForm){
    //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
            const user=userCredential.user;    
            updateProfile(user, {
              displayName: name.current.value, 
              photoURL: "https://in.images.search.yahoo.com/search/images;_ylt=AwrKFxs7xvNllHYDMuK7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Nj?p=profile+image&type=E210IN826G0&ei=UTF-8&fr=mcafee&th=118.9&tw=118.9&imgurl=https%3A%2F%2Fd2qp0siotla746.cloudfront.net%2Fimg%2Fuse-cases%2Fprofile-picture%2Ftemplate_0.jpg&rurl=https%3A%2F%2Fsnappa.com%2Fcreate%2Fprofile-pictures&size=45KB&name=Online+Profile+Picture+Maker+-+Free+%26+Easy+to+Use+%7C+Snappa&oid=4&h=1000&w=1000&turl=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.L8bs33mJBAUBA01wBfJnjQHaHa%26pid%3DApi%26rs%3D1%26c%3D1%26qlt%3D95%26w%3D118%26h%3D118&tt=Online+Profile+Picture+Maker+-+Free+%26+Easy+to+Use+%7C+Snappa&sigr=tYQqu59JM6SS&sigit=7puVwIBgPTgN&sigi=Nrivuf_LB94n&sign=hkpc.TyiCXrF&sigt=hkpc.TyiCXrF"
            }).then(() => {
              const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
              navigate("/browse");
            }).catch((error) => {
              setErrorMessage(error.message);
            });
        
        console.log(user);
        // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage)
          // ..
        });
  }
  else{
    //sign in logic
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+ errorMessage)
      });
  }
  }

  return (
    <div>
      <Header/>
    <div className='absolute'>
      <img  src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background image"/>
    </div>
    <form onSubmit={(e)=>e.preventDefault()} className="w-1/4 absolute bg-black bg-opacity-80 p-12 left-0 right-0 my-36 mx-auto text-white">
      <h1 className="font-bold text-3xl px-2 py-4">{isSignInForm ? "Sign In":"Sign Up"}</h1>
      
      {!isSignInForm && 
          <input ref={name} type="text" placeholder="Enter Full Name" className='p-2 m-2 w-full bg-gray-700'/>
      }
      
      <input ref={email} type="text" placeholder="Enter e-mail" className='p-2 m-2 w-full bg-gray-700'/>
      <input ref={password} type="password" placeholder="Enter password" className='p-2 m-2 w-full bg-gray-700'/>
      
      <p className='font-bold text-red-500 m-2'>
        {errorMessage}
      </p>
      
      <button className='p-4 m-2 w-full bg-red-700' onClick={handleBtnClick}>{isSignInForm? "Sign In":"Sign Up"}</button>
      
      <p className='p-2 m-2 text-0.5xl cursor-pointer' onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now":"Already a user?Sign In now." }</p>
    </form>
    </div>
  )
}

export default Login