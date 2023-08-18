import React, { useEffect, useState } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ApiGet } from '../utils/ApiData'
import { loginAction, logoutAction, setUserData } from '../redux/reducer/authReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { add } from '../redux/reducer/cartReducer'
import AuthStorage from '../utils/AuthStorage'
import STORAGEKEY from '../config/storageKey'

const Layout = ({ children, ...props }) => {

    const noAuth = ['/', '/category', '/collection']

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [first, setfirst] = useState(0)
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get('token');

    const authCheck = () => {
        ApiGet('auth')
        .then((res) => {
            dispatch(setUserData(res.data))
        })
        .catch((err) => {
            console.log(err);
            if (!(noAuth.includes(location.pathname))) {
                dispatch(logoutAction())
                console.log('running')
                navigate('/sign-in')
            }
        })
    }

    useEffect(() => {
        if (queryToken && queryToken != '' && queryToken != null) { 
            AuthStorage.setStorageJsonData(STORAGEKEY.token, queryToken, true)
            window.location.href = process.env.REACT_APP_CLIENT_ROOT_URL
        }
        location.pathname != "/sign-in" && authCheck()
    }, [children])

    return (
        <div className='min-vh-100 d-flex flex-column'>
            {location.pathname != "/sign-in" && <Header />}
            <div className='flex-grow-1' {...props}>{children}</div>
            <Footer/>
        </div>
    )
};

export default Layout;