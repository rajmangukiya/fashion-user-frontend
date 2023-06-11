import React, { useState } from 'react'
import { ApiPost } from '../../utils/ApiData';
import {load} from '@cashfreepayments/cashfree-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/reducer/authReducer';

const PaymentDetails = ({ userData, addressDetails, getPriceDetails }) => {

    const merchantId = process.env.REACT_APP_MERCHANT;

    const dispatch = useDispatch()

    const createOrder = () => {
        try {
            const orderData = {
                itemDetails: userData.cart.map(cartItem => ({
                    itemId: cartItem.item._id,
                    quantity: cartItem.quantity
                })),
                merchantId,
                amount: getPriceDetails().totalAmount,
                instruction: 'no instruction',
                addressDetails: {
                    first_name: addressDetails?.firstName,
                    last_name: addressDetails?.lastName,
                    email: addressDetails?.email,
                    mobile: addressDetails?.mobile,
                    company: addressDetails?.company,
                    address: addressDetails?.address,
                    landmark: addressDetails?.landmark,
                    state: addressDetails?.state,
                    country: addressDetails?.country,
                    pincode: addressDetails?.pincode
                }
            }
            return ApiPost("order/createOrder", orderData)

        } catch (error) {
            
        }
    }

    const initializePayment = async (orderDetails) => {
        const cashfree = await load({
            mode: "sandbox" //or production
        });
        let checkoutOptions = {
            paymentSessionId: orderDetails.data.payment_session_id,
            returnUrl: "http://localhost:3000",
        }
        cashfree.checkout(checkoutOptions).then(function(result){
            if(result.error){
                alert(result.error.message)
            }
            if(result.redirect){
                // dispatch(clearCart())
            }
        });
    }

    const makePayment = async () => {
        try {
            const orderDetails = await createOrder()
            await initializePayment(orderDetails)
            
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <div className='w-100 d-flex justify-content-center mt-5 pt-5'>
        <div style={{width: '30%'}} className='border border-1 p-5'>
        <div className='fs-5 mb-4'>Price Details</div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>Total MRP</div>
                    <div>₹ {getPriceDetails().totalMrp}</div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>GST</div>
                    <div>₹ {getPriceDetails().gst}</div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>Shipping Charges</div>
                    <div>₹ {getPriceDetails().shippingCharges}</div>
                </div>
                <div className='border-bottom border-1 my-3'></div>
                <div className='d-flex justify-content-between'>
                    <div>Total Amount</div>
                    <div>₹ {getPriceDetails().totalAmount}</div>
                </div>
                <div 
                    style={{backgroundColor: '#A28E69', cursor: 'pointer'}} 
                    className='text-white py-2 text-center mt-4'
                    onClick={makePayment}
                >Pay Now</div>
        </div>
        </div>
    )
}

export default PaymentDetails