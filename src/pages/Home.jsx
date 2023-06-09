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
            const {data} = await ApiPost('category/getCategories', { merchantId });
            console.log("categories", data);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }


    const fetchItems = async () => {
        try {
            const {data} = await ApiPost("item/getItems", { merchantId });
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
                fetchItems();
                fetchCategories();
            }
        } 
            catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // handlePostSSOAuth()
        // fetchItems();
        // fetchCategories();
    }, [])

    useEffect(() => {
        handlePostSSOAuth()
        console.log('ssoUserData.user2', ssoUserData?.user);
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
            
        </div>
    )
}

export default Home

