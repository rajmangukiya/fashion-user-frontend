import React, { useEffect } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ApiGet } from '../utils/ApiData'
import { loginAction, logoutAction } from '../redux/reducer/authReducer';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children, ...props }) => {

    const noAuth = ['/', '/category', '/item']

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isLogged = useSelector((state) => state.authInfo.isLogged);

    const authCheck = () => {
        if (!(noAuth.includes(location.pathname))) {
            ApiGet('auth')
            .then((res) => {
                dispatch(loginAction())  
            })
            .catch((err) => {
                console.log(err);
                navigate('/sign-in')
                dispatch(logoutAction())
            })
        }
    }

    useEffect(() => {
        authCheck()
    }, [])

    return (
        <div>
            {/* {isLogged ?? <Header />} */}
            <Header/>
            <div className='pt-5' {...props}>{children}</div>
            <Footer />
        </div>
    )
};

export default Layout;