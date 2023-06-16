import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { addToCart, decreaseFromCart } from '../../redux/reducer/authReducer'
import { Carousel } from 'react-responsive-carousel';
import { ApiGetNoAuth, ApiPostNoAuth, ApiPost } from '../../utils/ApiData.js'
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { RatingStar } from '../../components/index.jsx';
import Gallery from '../../components/gallery/Gallery';
import GalleryCarousel from '../../components/carousel/galleryCarousel/GalleryCarousel'

const Item = () => {
    const { userData } = useSelector(state => state.authInfo);
    const [item, setItem] = useState({});
    const [itemCount, setItemCount] = useState(0);
    const [isItemInCart, setIsItemInCart] = useState(true);
    const [selectedSize, setSelectedSize] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const itemId = params.itemId;

    const sizes = ["S", "M", "L", "XL", "XXL"]
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

    const decreaseCount = () => {
        setItemCount(prev => prev === 0 ? 0 : prev - 1);
    }
        
    const increaseCount = () => {
        setItemCount(prev => prev + 1);
    }

    const addItemToCart = (item, itemCount) => async() => {
        try {
            dispatch(addToCart({item, itemCount}));
            await ApiPost("item/addToCart", { itemId: item._id, quantity: itemCount });
            setItemCount(0)
        } catch (error) {
            console.log(error)
        }
    }

    const checkIsItemInCart = (itemId) => {
        console.log('userData', userData);
        if (userData?.cart?.find(cartItem => cartItem.item._id == itemId)) setIsItemInCart(true)
        else setIsItemInCart(false)
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

    const buyNow = async () => {
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
        const { data } = await ApiGetNoAuth(`item/getItem/${itemId}`)
        setItem(data)
    }

    useEffect(() => {
      fetchItem()
      checkIsItemInCart()
    }, [])

    useEffect(() => {
        console.log('item1', item);
    }, [item])

    return (
        <div className='d-flex flex-column align-items-center mt-5 pt-4 p-5'>
            <div className='d-flex pt-5 justify-content-center'>
                {/* {
                    window.innerWidth > 1024
                    ? <Gallery item={item} />
                    : <GalleryCarousel item={item} />
                } */}
                <Gallery item={item} />
                <div className='d-flex flex-column w-25'>
                    <p>{item?.categoryName}</p>
                    <h3>{item?.title}</h3>
                    <div className='d-flex mt-0 mb-3 align-items-center'>
                        <p className='text-muted me-3 fs-5'>
                            <del>₹{item?.price}</del>
                        </p>
                        <p className='fs-5'>₹{item?.discountedPrice}</p>
                    </div>
                    <div>
                        <div className='d-flex'>
                            <div className='fw-bold me-2'>Size:</div>
                            <div>{sizes[selectedSize]}</div>
                        </div>
                        <div className='d-flex mb-5 mt-2'>
                            {
                                sizes.map((size, index) => {
                                    return (
                                        <div 
                                            style={{cursor: 'pointer'}} 
                                            key={index}
                                            onClick={() => setSelectedSize(index)}
                                            className={`${index == selectedSize ? 'bg-black text-white' : 'border border-1'} px-3 py-2 me-2`}
                                        >{size}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='d-flex flex-column mb-4'>
                        <div className='fw-bold mb-2'>Quantity</div>
                        <div className='d-flex align-items-center border border-1 align-self-baseline px-4 py-2'>
                            <button onClick={decreaseCount} className=''>-</button>
                            <div className='fs-5 mx-5'>{itemCount}</div>
                            <button onClick={increaseCount} className=''>+</button>
                        </div>
                    </div>
                    <button 
                        onClick={addItemToCart(item, itemCount)} 
                        className='bg-black text-white py-3 rounded-1 mb-3'
                    >Add To Cart</button>
                    {
                        isItemInCart
                        ?
                        <button 
                            onClick={() => navigate('/cart')} 
                            style={{backgroundColor: '#A28E69'}}
                            className='text-white py-3 rounded-1'
                        >View Cart</button>
                        :
                        <></>
                    }
                    {/* <button onClick={buyNow} className='px-4 py-3 mt-3 bg-dark text-light rounded-1'>Buy it Now</button> */}
                    <div className='fw-bold mt-5 mb-2'>Description</div>
                    <div className=''>{item?.description}</div>
                </div>
            </div>
            {/* <div className='align-items-center d-flex flex-column'>
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
            </div> */}
        </div>
    )
}

export default Item