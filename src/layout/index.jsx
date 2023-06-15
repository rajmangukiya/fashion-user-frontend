import React, { useEffect } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { ApiGet } from '../utils/ApiData'
import { loginAction, logoutAction, setUserData } from '../redux/reducer/authReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { add } from '../redux/reducer/cartReducer'

const Layout = ({ children, ...props }) => {

    const noAuth = ['/', '/category', '/item', '/collection']

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isLogged = useSelector((state) => state.authInfo.isLogged);

    const authCheck = () => {
        ApiGet('auth')
        .then((res) => {
            dispatch(loginAction())
            dispatch(setUserData(res.data))
        })
        .catch((err) => {
            console.log(err);
            if (!(noAuth.includes(location.pathname))) {
                navigate('/sign-in')
                dispatch(logoutAction())
            }
        })
    }

    useEffect(() => {
        authCheck()
    }, [])

    return (
        <div className=''>
            {location.pathname != "/sign-in" && <Header />}
            {/* <Header/> */}
            <div className='' {...props}>{children}</div>
            <Footer />
        </div>
    )
};

export default Layout;