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
import { useAuth, useUser } from '@clerk/clerk-react';
import { loginAction } from '../redux/reducer/authReducer';

const Home = () => {

    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const cart = [];
    const merchantId = process.env.REACT_APP_MERCHANT;
    const navigate = useNavigate();
    const ssoAuthData = useAuth();
    const ssoUserData = useUser();

    const openCategory = (name) => {
        navigate(`/category/${name}`)
    }

    const openItem = (id = 1) => {
        navigate(`/item/${id}`);
    }

    const fetchCategories = async () => {
        try {
            const {data} = await ApiPostNoAuth('category/getCategories', { merchantId });
            console.log("categories", data);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }


    const fetchItems = async () => {
        try {
            const {data} = await ApiPostNoAuth("item/getItems", { merchantId });
            console.log("items", data);
            setItems(data);
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (item) => {
        try {

            cart.push(item);
            AuthStorage.setStorageJsonData(STORAGEKEY.token, cart, true);
            dispatch(add(item));
        } 
            catch (error) {
            console.log(error);
        }
    }

    const handlePostSSOAuth = async () => {
        try {
            if (ssoUserData?.user) {
                const res = await ApiPostNoAuth('auth/login', {
                    email: ssoUserData?.user?.primaryEmailAddress.emailAddress,
                    firstName: ssoUserData?.user?.firstName,
                    lastName: ssoUserData?.user?.lastName,
                    mobile: ssoUserData?.user?.phoneNumbers.map(number => number.phoneNumber),
                    avatar: ssoUserData?.user?.imageUrl,
                    merchantId
                });
                dispatch(loginAction(res?.data?.token))
            }
        } 
            catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, [])

    useEffect(() => {
        handlePostSSOAuth()
    }, [ssoUserData?.user])
    
    
    
    return (
        <div>
            {
                window.innerWidth > 1000
                    ?
                    <Banner />
                    :
                    <></>
            }
            
            {/* All Collections Carousel */}
            <MaxCarousel categories={categories} />

            {/* New Arrivals Section */}
            <div style={{textAlign: 'center'}}>
                <h4>New Arrivals</h4>
            </div>  
            <MinCarousel categories={categories}/>

            {/* Best Selling Section */}
            <div style={{textAlign: 'center'}}>
                <h4>Best Selling</h4>
            </div>  
            <MinCarousel categories={categories}/>
            <form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"  >
                <input type="text" name="access_code" id="access_code" value="AVYE76KF47AV91EYVA" style={{display:'none'}} />
                <input type="text" id="encRequest" name="encRequest" value="f38202448dc76c8aa880ee85b025e8a310695299988d20076647111a2f92b55e726655cd717c52096f9a261d5d9ec9d91d7c83b6463e419a2cb9c96e10cb68f7a2d8ec9380da097fd6453b2815cc82adf38c2766b6518e585465586ed4bf0aa91f04dc731b3b3078da3b745bc1279a2263f1cc91936ba0e54d65b52fa91753c3fdda143832449988789c41bec01e91a3" style={{display:'none'}} />
                <input type='submit' name='submit' value='pay now' />
                {/* <script language="javascript">{document.redirect.submit()}</script> */}
            </form>
        </div>
    )
}

export default Home

