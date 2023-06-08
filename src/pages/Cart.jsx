import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { remove } from '../redux/reducer/cartReducer'
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi'
import { addToCart, decreaseFromCart, removeFromCart } from '../redux/reducer/authReducer';
import { ApiPost } from '../utils/ApiData';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { userData } = useSelector(state => state.authInfo);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const increaseQuantity = (item) => async () => {
        try {
            dispatch(addToCart(item));
            await ApiPost("item/addToCart", { itemId: item._id, quantity: 1 });
        } catch (error) {
            console.log(error);
        }
    }

    const decreaseQuantity = (itemId) => async () => {
        try {
            dispatch(decreaseFromCart(itemId));
            await ApiPost("item/removeFromCart", { itemId, isRemove: false });
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromCartHandler = (itemId) => async () => {
        try {
            dispatch(removeFromCart(itemId));
            await ApiPost("item/removeFromCart", { itemId, isRemove: true });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      console.log('userData', userData.cart);
    }, [userData])
    

  return (
    <div className='w-100 p-5'>
        <div className='w-100 d-flex'>
            <BiArrowBack
                onClick={() => navigate(-1)}
                style={{color: '#A28E69', cursor: 'pointer'}}
                className='fs-2' />
            <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <div style={{color: '#A28E69'}} className='fs-5'>Bag</div>
                <div style={{width: '10%'}} className='border-bottom border-2 mx-4'></div>
                <div>Address</div>
                <div style={{width: '10%'}} className='border-bottom border-2 mx-4'></div>
                <div>Payment</div>
            </div>
        </div>
        <div className='d-flex mt-5 align-items-start'>
            <div className='border border-1 w-75 p-5 me-3'>
                {
                    userData.cart?.map((cartItem, index) => <>
                        <div key={index} className='d-flex'>
                            <img style={{width: '200px', height: '280px', objectFit: 'cover'}} className='me-5' src={cartItem?.item?.images?.length ? cartItem?.item?.images[0] : ''} />
                            <div className='d-flex flex-column align-items-start'>
                                <div className='fs-3 fw-normal'>{cartItem?.item.title}</div>
                                <div className='mb-3'>{cartItem?.item.description}</div>
                                <div className='fs-5'>₹ {cartItem?.item.discountedPrice}</div>
                                <div className='bg-dark py-2 px-3 text-white mt-2 mb-3 bg-opacity-75'>S</div>
                                <div className='d-flex flex-column justify-content-end flex-grow-1'>
                                    <div className='mb-2'>Quantity:</div>
                                    <div className='d-flex'>
                                        <div className='d-flex border border-1 border-dark px-2 me-2 align-items-center'>
                                            <div 
                                                style={{cursor: 'pointer'}} 
                                                className='p-2'
                                                onClick={decreaseQuantity(cartItem?.item?._id)}
                                            >-</div>
                                            <div className='mx-4'>{cartItem?.quantity}</div>
                                            <div 
                                                style={{cursor: 'pointer'}} 
                                                className='p-2'
                                                onClick={increaseQuantity(cartItem?.item)}
                                            >+</div>
                                        </div>
                                        <div 
                                            style={{cursor: 'pointer'}}
                                            className='bg-dark text-white d-flex align-items-center px-5 bg-opacity-75'
                                            onClick={removeFromCartHandler(cartItem?.item?._id)}
                                        >Remove</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border-bottom border-1 my-5'></div>
                    </>)
                }
            </div>
            <div className='border border-1 flex-grow-1 p-5'>
                <div className='fs-5 mb-4'>Price Details</div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>Total MRP</div>
                    <div>₹ 4000.00</div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>GST</div>
                    <div>₹ 100.00</div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>Shipping Charges</div>
                    <div>₹ 100.00</div>
                </div>
                <div className='border-bottom border-1 my-3'></div>
                <div className='d-flex justify-content-between'>
                    <div>Total Amount</div>
                    <div>₹ 4200.00</div>
                </div>
                <div 
                    style={{backgroundColor: '#A28E69'}} 
                    className='text-white py-2 text-center mt-4'
                >Place Order</div>
            </div>
        </div>
    </div>
  )
}

export default Cart