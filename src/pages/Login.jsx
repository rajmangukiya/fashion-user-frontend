import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ApiDelete, ApiGet, ApiPatch, ApiPost, ApiPostNoAuth } from '../utils/ApiData';
import { useDispatch } from 'react-redux'
import STORAGEKEY from '../config/storageKey.js'
import AuthStorage from '../utils/AuthStorage';
import { loginAction } from '../redux/reducer/authReducer';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Home from './Home';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const Login = () => {

  const [form, setForm] = useState({
    mobile: '',
    password: ''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await ApiPostNoAuth('auth/login', form);
      AuthStorage.setStorageJsonData(STORAGEKEY.token, res?.data?.token, true);
      dispatch(loginAction())
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Home />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}

export default Login