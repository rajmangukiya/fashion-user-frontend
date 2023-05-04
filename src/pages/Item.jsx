import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ApiPostNoAuth } from '../utils/ApiData.js'

const Item = () => {

    const [itemCount, setItemCount] = useState(0);

    const item = {
        id: 1,
        category: 'Party Wear Saree',
        name: 'Reception Wear Saree',
        mrp: 1599,
        price: 999,
        images: [
            'https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79415.jpg',
            'https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79411.jpg',
            'https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79408.jpg',
            'https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79415.jpg',
            'https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79411.jpg',
            'https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79408.jpg'
        ]
    }

    const decreaseCount = () => {
        setItemCount(prev => prev == 0 ? 0 : prev - 1);
    }

    const increaseCount = () => {
        setItemCount(prev => prev + 1);
    }

    const addToCart = () => {
        setItemCount(0);
    }

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve()
            }
            script.onerror = () => {
                reject()
            }
            document.body.appendChild(script)
        })
    }

    const buyNow =async  () => {
        try {
            await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            const { data } = await ApiPostNoAuth('payment/createRazorpayOrder', {amount: 500})
            const options = {
                "key": 'rzp_test_oolCMq6FN4WSTv',
                "amount": "50000",
                "currency": "INR",
                "name": "Rainbow Tech",
                "description": "Test Transaction",
                "image": "https://sastabazzars.in/wp-content/uploads/2022/10/ProductCImage_79415.jpg",
                "order_id": data.id,
                "handler": function (response){
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature)
                },
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='gallery-container pt-5'>
                <div className='gallery'>
                    <Carousel>
                        {
                            item.images.map(image => (
                                <div>
                                    <img src={image} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
                <div className='d-flex flex-column'>
                    <p>{item.category}</p>
                    <h3>{item.name}</h3>
                    <div className='d-flex mt-0 mb-3 align-items-center'>
                        <p className='text-muted me-3 fs-5'>
                            <del>{item.mrp}₹</del>
                        </p>
                        <p className='fs-5 text-danger fs-3'>{item.price}₹</p>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex align-items-center border border-2 align-self-baseline'>
                            <button onClick={decreaseCount} className='px-4 fs-3'>-</button>
                            <div className='fs-4'>{itemCount}</div>
                            <button onClick={increaseCount} className='px-4 fs-3'>+</button>
                        </div>
                        <button onClick={addToCart} className='px-4 fs-5 bg-dark text-light ms-3'>Add To Cart</button>
                    </div>
                    <button onClick={buyNow} className='px-4 py-2 mt-3 fs-5 bg-dark text-light'>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Item