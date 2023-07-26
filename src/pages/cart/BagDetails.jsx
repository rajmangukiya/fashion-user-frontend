import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseFromCart, removeFromCart } from '../../redux/reducer/authReducer';
import { ApiPost } from '../../utils/ApiData';
import './styles.css'

const BagDetails = ({ setSelectedTab, userData, getPriceDetails }) => {

    const dispatch = useDispatch()

    const increaseQuantity = (cartItem) => async () => {
        try {
            dispatch(addToCart({item: cartItem?.item, size: cartItem?.size, itemCount: 1}));
            // await ApiPost("item/addToCart", { itemId: cartItem?.item?._id, size: cartItem?.size, quantity: 1 });
        } catch (error) {
            console.log(error);
        }
    }

    const decreaseQuantity = (cartItem) => async () => {
        try {
            if (cartItem.quantity <= 1) return
            dispatch(decreaseFromCart(cartItem));
            await ApiPost("item/removeFromCart", { itemId: cartItem?.item?._id, size: cartItem?.size, isRemove: false });
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromCartHandler = (cartItem) => async () => {
        try {
            dispatch(removeFromCart(cartItem));
            await ApiPost("item/removeFromCart", { itemId: cartItem?.item?._id, size: cartItem?.size, isRemove: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg1-container d-flex align-items-start px-5'>
            <div className='bg1-items-container border border-1 p-5 me-3'>
                {
                    userData?.cart?.map((cartItem, index) => 
                    <div key={index}>
                        <div className='bg1-item-container d-flex'>
                            <img className='me-5' src={cartItem?.item?.images?.length ? cartItem?.item?.images[0] : ''} />
                            <div className='w-100 d-flex flex-column align-items-start'>
                                <div className='bg1-item-title fs-3 fw-normal'>{cartItem?.item?.title}</div>
                                <div className='bg1-item-description mb-3'>{cartItem?.item?.description}</div>
                                <div className='bg1-item-price fs-5 mb-4'>₹ {cartItem?.item?.discountedPrice}</div>
                                <div className='bg1-size-quantity-container d-flex'>
                                    <div className='d-flex flex-column align-items-baseline'>
                                        <div className='bg1-item-size-title mb-1 text-black'>Size:</div>
                                        <div className='bg1-item-size px-3 me-4 text-black border border-1 border-dark bg-opacity-75 flex-grow-1 d-flex align-items-center'>{cartItem?.size}</div>
                                    </div>
                                    <div className='bg1-item-quantity d-flex flex-column justify-content-end flex-grow-1'>
                                        <div className='bg1-item-quantity-title mb-1'>Quantity:</div>
                                        <div className='bg1-quantity-box-container d-flex'>
                                            <div className='bg1-quantity-box d-flex border border-1 border-dark py-2 px-4 me-2 align-items-center'>
                                                <div 
                                                    style={{cursor: 'pointer'}} 
                                                    className=''
                                                    onClick={decreaseQuantity(cartItem)}
                                                >-</div>
                                                <div className='mx-4'>{cartItem?.quantity}</div>
                                                <div 
                                                    style={{cursor: 'pointer'}} 
                                                    className=''
                                                    onClick={increaseQuantity(cartItem)}
                                                >+</div>
                                            </div>
                                            <div 
                                                style={{cursor: 'pointer', backgroundColor: '#876952'}}
                                                className='bg1-quantity-box text-white d-flex align-items-center px-5'
                                                onClick={removeFromCartHandler(cartItem)}
                                            >Remove</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            userData.cart.length == (index + 1) ? <></> : <div className='border-bottom border-1 my-5'></div>
                        }
                    </div>)
                }
            </div>
            <div className='bg1-price-container border border-1 flex-grow-1 p-5'>
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
                    style={{backgroundColor: '#876952', cursor: 'pointer'}} 
                    className='bg1-text-container text-white py-2 text-center mt-4'
                    onClick={() => setSelectedTab('address')}
                >Place Order</div>
            </div>
        </div>
    )
}

export default BagDetails