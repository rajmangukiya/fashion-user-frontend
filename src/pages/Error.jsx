import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { add } from '../redux/reducer/cartReducer';
import STORAGEKEY from '../config/storageKey.js';
import AuthStorage from '../utils/AuthStorage';
import { ApiGet, ApiPost, ApiPostNoAuth } from '../utils/ApiData.js';
import { Banner, MaxCarousel } from '../components';
import { MinCarousel } from '../components';
import { loginAction } from '../redux/reducer/authReducer';
//
const Error = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('')
    }, [])
    
    return (
        <div className=''>
            
        </div>
    )
}

export default Error

