import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { add } from '../redux/reducer/cartReducer';
import STORAGEKEY from '../config/storageKey.js';
import AuthStorage from '../utils/AuthStorage';
import { ApiGet, ApiPostNoAuth } from '../utils/ApiData.js';
import { MaxCarousel } from '../components';
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
            const {data} = await ApiGet(`category/getCategories/${merchantId}`);
            console.log("categories", data);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }


    const fetchItems = async () => {
        try {
            const {data} = await ApiGet("item/getItems?category=ALL");
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
            catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      handlePostSSOAuth()
      console.log(ssoUserData);
    }, [])
    
    
    return (
        <div>
            {
                window.innerWidth > 1000
                    ?
                    <img className='w-100 100vh' src='https://sastabazzars.in/wp-content/uploads/2022/09/1900_x_730_anmazing_factory_benner_03_web.jpg' />
                    :
                    <></>
            }
            
            {/* All Collections Carousel */}
            <MaxCarousel categories={categories} />

            {/* New Arrivals Section */}
            <div style={{textAlign: 'center'}}>
                <h4>All Collection</h4>
            </div>  
            <MinCarousel categories={categories}/>
            {/* Category */}
            {/* <div className='d-flex flex-column align-items-center'>
                <h2 className='my-4'>Shop By Category</h2>
                <div className='d-flex w-100 justify-content-center flex-wrap'>
                    {
                        categories.map(category => (
                            <div key={category.id} onClick={() => openCategory(category.name)} className='item-container'>
                                <img className='w-100' src={category.image} />
                                <p className='text-center fs-4 text-dark'>{category.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div> */}

            {/* Trending */}
            {/* <div className='d-flex flex-column align-items-center'>
                <h2 className='my-4'>Trending</h2>
                <div className='d-flex w-100 justify-content-center flex-wrap'>
                    {
                        items.map(item => (
                            <div key={item.id} onClick={() => openItem()} className='item-container'>
                                <img className='w-100' src={item.image} />
                                <p className='text-center fs-5 mt-2 mb-0 text-dark'>{item.name}</p>
                                <div className='d-flex mt-0 mb-3 justify-content-center align-items-center'>
                                    <p className='text-center text-muted me-3'>
                                        <del>{item.mrp}₹</del>
                                    </p>
                                    <p className='text-center fs-5 text-danger'>{item.price}₹</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div> */}

            {/* New Arrivel */}
            {/* <div className='d-flex flex-column align-items-center'>
                <h2 className='my-4'>New Arrivals</h2>
                <div className='d-flex w-100 justify-content-center flex-wrap'>
                    {
                        items.map(item => (
                            <>
                                <Card key={item.id} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                                Some
                                            </Card.Text>
                                        <Button onClick={() => addToCart(item)} variant="primary">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </>
                        ))
                    }
                </div>
            </div> */}
        </div>
    )
}

export default Home

