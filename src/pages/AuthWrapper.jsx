import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({Component}) => {

    const isLogged = useSelector((state) => state.authInfo.isLogged);
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            console.log('chalaa');
            if(!isLogged) navigate('/sign-in')
        }, 2000);
    }, [])
    

    return (
        <Component />
    )
}

export default AuthWrapper