import React, { useEffect } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ApiGet } from '../utils/ApiData'
import { loginAction, logoutAction } from '../redux/reducer/authReducer';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, ...props }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const isLogged = useSelector((state) => state.authInfo.isLogged);

    useEffect(() => {
        ApiGet('auth')
        .then((res) => {
            dispatch(loginAction())  
        })
        .catch((err) => {
            console.log(err);
            // navigate('login')
            dispatch(logoutAction())
        })
    }, [])

    return (
        <div>
            {isLogged ?? <Header />}
            <div className='pt-5' {...props}>{children}</div>
            <Footer />
        </div>
    )
};

export default Layout;