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
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }


    const fetchItems = async () => {
        try {
            const {data} = await ApiPostNoAuth("item/getItems", { merchantId });
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
    
    useEffect(() => {
        console.log('items', items);
    }, [items])
    
    return (
        <div>
            <Banner />

            {/* All Collections Carousel */}
            <MaxCarousel categories={categories} />

            {/* New Arrivals Section */}
            <div style={{textAlign: 'center'}} className=''>
                <h4 style={{fontSize: '1.2rem'}}>New Arrivals</h4>
            </div>  
            <MinCarousel items={items}/>

            {/* Best Selling Section */}
            <div style={{textAlign: 'center'}} className='pt-5 mb-4'>
                <h4 style={{fontSize: '1.2rem'}}>Best Selling</h4>
            </div>  
            <MinCarousel items={items}/>
        </div>
    )
}

export default Home

