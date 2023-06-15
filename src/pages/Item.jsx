import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ApiGetNoAuth, ApiPostNoAuth } from '../utils/ApiData.js'
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { RatingStar } from '../components/index.jsx';

const Item = () => {
    const [item, setItem] = useState({});
    const [itemCount, setItemCount] = useState(0);
    const params = useParams()

    const decreaseCount = () => {
        setItemCount(prev => prev == 0 ? 0 : prev - 1);
    }

    const increaseCount = () => {
        setItemCount(prev => prev + 1);
    }

    const addToCart = (item, itemCount) => {
        
    }

    const reviews = [
        {
            user : "Smit Bhalani",
            review : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi, quo laborum amet quas earum ipsam quaerat quia iure, tenetur velit natus ducimus, harum nostrum cumque iste modi sit consequatur!",
            rating : 5
        },
        {
            user : "Raj Mangukiya",
            review : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi, quo laborum amet quas earum ipsam quaerat quia iure, tenetur velit natus ducimus, harum nostrum cumque iste modi sit consequatur!",
            rating : 3
        },
        {
            user : "Bhagat",
            review : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sequi, quo laborum amet quas earum ipsam quaerat quia iure, tenetur velit natus ducimus, harum nostrum cumque iste modi sit consequatur!",
            rating : 3.5
        }
    ]

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

    const buyNow = async  () => {
        try {
            await loadScript('https://checkout.razorpay.com/v1/checkout.js');
            const { data } = await ApiPostNoAuth('payment/createRazorpayOrder', {amount: 500});
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

    const fetchItem = async () => {
        const { data } = await ApiGetNoAuth(`item/getItem/${params.itemId}`)
        setItem(data)
        console.log(data);
    }

    useEffect(() => {
      fetchItem()
    }, [])
    

    return (
        <div className='d-flex flex-column align-items-center mt-5'>
            <div className='gallery-container pt-5'>
                <div className='gallery'>
                    <Carousel>
                        {
                            item?.images?.map(image => (
                                <div>
                                    <img src={image} />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
                <div className='d-flex flex-column'>
                    <p>{item?.categoryName}</p>
                    <h3>{item?.title}</h3>
                    <div className='d-flex mt-0 mb-3 align-items-center'>
                        <p className='text-muted me-3 fs-5'>
                            <del>{item?.price}₹</del>
                        </p>
                        <p className='fs-5 text-danger fs-3'>{item?.discountedPrice}₹</p>
                    </div>
                    <div className='d-flex'>
                        <div className='d-flex align-items-center border border-2 align-self-baseline'>
                            <button onClick={decreaseCount} className='px-4 fs-3'>-</button>
                            <div className='fs-4'>{itemCount}</div>
                            <button onClick={increaseCount} className='px-4 fs-3'>+</button>
                        </div>
                        <button onClick={() => addToCart(item, itemCount)} className='px-4 fs-5 bg-dark text-light ms-3'>Add To Cart</button>
                    </div>
                    <button onClick={buyNow} className='px-4 py-2 mt-3 fs-5 bg-dark text-light'>Buy Now</button>
                    <div className='my-3'>{item?.description}</div>
                </div>
            </div>
            <div className='align-items-center d-flex flex-column'>
                <h5>Customer Review</h5>
                {
                    reviews.map(review => {
                        return(
                            <Card className="review-card">
                                <Card.Title>{review.user}</Card.Title>
                                <Card.Text style={{color:"#A28E69"}}><RatingStar rating={review.rating}/></Card.Text>
                                <Card.Text>{review.review}</Card.Text>
                            </Card>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Item