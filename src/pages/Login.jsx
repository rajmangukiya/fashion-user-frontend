import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ApiDelete, ApiGet, ApiPatch, ApiPost, ApiPostNoAuth } from '../utils/ApiData';
import { useDispatch } from 'react-redux'
import STORAGEKEY from '../config/storageKey.js'
import AuthStorage from '../utils/AuthStorage';
import { loginAction } from '../store/reducer/authReducer';

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
    <div className='d-flex flex-column align-items-center justify-content-center position-absolute top-0 start-0 bg-white vh-100 vw-100'>
      <div className='bg-white p-5 d-flex flex-column align-items-center rounded-1'>
        <div className='display-5 mb-5 pb-5'>LOGIN</div>
        <input onChange={(e) => setForm(prev => {
          return {
            ...prev,
            mobile: e.target.value
          }
        })} className='input-box' autoComplete='off' maxLength={14} placeholder='Enter Mobile Number' />
        <input onChange={(e) => setForm(prev => {
          return {
            ...prev,
            password: e.target.value
          }
        })} type='password' className='input-box' autoComplete='off' maxLength={10} placeholder='Enter Password' />
        <div onClick={loginHandler} style={{zIndex: 10, cursor: 'pointer'}} className='bg-black text-white px-5 py-2 w-100 mt-5 text-center'>Login</div>
        
      </div>
    </div>
  )
}

export default Login