import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPatch, ApiPost, ApiPostNoAuth } from '../../utils/ApiData';
import { useDispatch, useSelector } from 'react-redux'
import STORAGEKEY from '../../config/storageKey.js'
import AuthStorage from '../../utils/AuthStorage';
import { loginAction } from '../../redux/reducer/authReducer';
import { FcGoogle } from 'react-icons/fc';
import { BiArrowBack } from 'react-icons/bi';
import './styles.css'

const Login = () => {

  const isLogged = useSelector((state) => state.authInfo.isLogged);

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
      // navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  const getGoogleUrl = async () => {
    console.log('in getGoogleUrl');
    const { data } = await ApiGetNoAuth('auth/googleAuth/getUrl')
    console.log('google response', data);
    window.location.href = data.url
  }

  const loginUser  = () => {

  }

  useEffect(() => {
    if(isLogged) {
      navigate('/')
    }
  }, [isLogged])
  
  
  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <BiArrowBack
        onClick={() => navigate('/')}
        className='login-back-arrow fs-2' />
      <h1 className='login-title'>LOGIN</h1>
      <div className='login-form d-flex flex-column'>
        <label for='login-email' className='login-label' >Email</label>
        <input id='login-email' className='login-input p-2 fw-bold' />
        <label for='login-email' className='login-label' >Password</label>
        <input id='login-email' className='login-input p-2 fw-bold' />
        <div onClick={loginUser} className='login-sign-in text-center py-2 fw-bold'>SIGN IN</div>
        <div className='text-center my-4'>OR</div>
        <div onClick={getGoogleUrl} className='login-google-container d-flex justify-content-center align-items-center py-2'>
          <FcGoogle className='fs-3 me-2' />
          <div className='fw-bold'>Google</div>
        </div>
      </div>
    </div>
  )
}

export default Login