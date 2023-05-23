import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ApiDelete, ApiGet, ApiPatch, ApiPost, ApiPostNoAuth } from '../utils/ApiData';
import { useDispatch } from 'react-redux'
import STORAGEKEY from '../config/storageKey.js'
import AuthStorage from '../utils/AuthStorage';
import { loginAction } from '../redux/reducer/authReducer';

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
    <div className=''>
      <div>
        <div>LOGIN</div>
        <div>
          <label for='mobile'>Mobile Number</label>
          <input id='mobile' type='text'></input>
        </div>
        <div>Get Otp</div>
        <div>Or</div>
        <div>
          Sign in with Google
        </div>
      </div>
      <div>
        WELOCOME TO TRENDY STYLE
      </div>
    </div>
  )
}

export default Login