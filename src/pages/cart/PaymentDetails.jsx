import React, { useEffect, useState } from 'react'
import { ApiPost } from '../../utils/ApiData';
import { load } from '@cashfreepayments/cashfree-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/reducer/authReducer';
import axios from 'axios';

const PaymentDetails = ({ userData, addressDetails, getPriceDetails }) => {

    const merchantId = process.env.REACT_APP_MERCHANT;

    const dispatch = useDispatch()

    const createOrderAndGetPaymentUrl = () => {
        try {
            const orderData = {
                itemDetails: userData.cart.map(cartItem => {
                    return ({
                        itemId: cartItem?.item?._id,
                        quantity: cartItem?.quantity
                    })
                }),
                amount: getPriceDetails().totalAmount,
                instruction: 'no instruction',
                addressDetails: {
                    first_name: addressDetails?.firstName,
                    last_name: addressDetails?.lastName,
                    email: addressDetails?.email,
                    mobile: addressDetails?.mobile[0],
                    company: addressDetails?.company,
                    address: addressDetails?.address,
                    landmark: addressDetails?.landmark,
                    city: addressDetails?.city,
                    state: addressDetails?.state,
                    country: addressDetails?.country,
                    pincode: addressDetails?.pincode
                }
            }
            return ApiPost("payment/phonepe/pay", orderData)

        } catch (error) {

        }
    }

    const makePayment = async () => {
        try {
            const orderDetails = await createOrderAndGetPaymentUrl()
            // await initializePayment(orderDetails)
            window.location.href = orderDetails.data.url
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log('userData', userData);
    }, [userData])

    useEffect(() => {
        console.log('addressDetails', addressDetails);
    }, [addressDetails])

    return (
        <div className='w-100 d-flex justify-content-center mt-5'>
            <div className='pd-price-box border border-1 p-5'> 
                <div className='bg1-price-title fs-5 mb-4'>Price Details</div>
                <div className='bg1-text-container d-flex justify-content-between mb-1'>
                    <div>Total MRP</div>
                    <div>₹ {getPriceDetails().totalMrp}</div>
                </div>
                <div className='bg1-text-container d-flex justify-content-between mb-1'>
                    <div>GST</div>
                    <div>₹ {getPriceDetails().gst}</div>
                </div>
                <div className='bg1-text-container d-flex justify-content-between mb-1'>
                    <div>Shipping Charges</div>
                    <div>₹ {getPriceDetails().shippingCharges}</div>
                </div>
                <div className='border-bottom border-1 my-3'></div>
                <div className='bg1-text-container d-flex justify-content-between'>
                    <div>Total Amount</div>
                    <div>₹ {getPriceDetails().totalAmount}</div>
                </div>
                <div
                    style={{ backgroundColor: '#876952', cursor: 'pointer' }}
                    className='bg1-text-container text-white py-2 text-center mt-4'
                    onClick={makePayment}
                >Pay Now</div>
            </div>
        </div>
    )
}

export default PaymentDetails