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
import './styles.css'


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

    const addItemToCart = (item, itemCount) => async () => {
        try {
            if(itemCount == 0) return
            dispatch(addToCart({item, itemCount, size: sizes[selectedSize]}));
            await ApiPost("item/addToCart", { itemId: item?._id, size: sizes[selectedSize], quantity: itemCount });
            setItemCount(0)
        } catch (error) {
            console.log(error)
        }
    }

    const checkIsItemInCart = (itemId) => {
        if (userData?.cart?.find(cartItem => cartItem.item._id == itemId)) setIsItemInCart(true)
        else setIsItemInCart(false)
    }

    const fetchItem = async () => {
        try {
            const { data } = await ApiGetNoAuth(`item/getItem/${itemId}`)
            setItem(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      fetchItem()
      checkIsItemInCart()
    }, [])

    return (
        <div className='main-item-container d-flex flex-column align-items-center mt-5 pt-5 pb-5'>
            <div className='custom-item-container d-flex justify-content-center align-items-center pt-5'>
                <Gallery item={item} />
                <div className='item-content-container d-flex flex-column align-items-baseline'>
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
                                            className={`${index == selectedSize ? 'bg-black text-white' : 'border border-1'} px-3 py-2 me-2 transform`}
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
                            <button onClick={increaseCount} >+</button>
                        </div>
                    </div>
                    <button 
                        onClick={addItemToCart(item, itemCount)} 
                        className='add-to-cart-button bg-black text-white py-3 px-5 rounded-1 mb-3'
                    >Add To Cart</button>
                    {
                        isItemInCart
                        ?
                        <button 
                            onClick={() => navigate('/cart')} 
                            style={{backgroundColor: '#F4EDE3'}}
                            className='text-white py-3 rounded-1'
                        >View Cart</button>
                        :
                        <></>
                    }
                    {/* <button onClick={buyNow} className='px-4 py-3 mt-3 bg-dark text-light rounded-1'>Buy it Now</button> */}
                    <div className='fw-bold mt-4 mb-2'>Description</div>
                    <div className='item-description'>{item?.description}</div>
                </div>
            </div>
            {/* <div className='align-items-center d-flex flex-column'>
                <h5>Customer Review</h5>
                {
                    reviews.map(review => {
                        return(
                            <Card className="review-card">
                                <Card.Title>{review.user}</Card.Title>
                                <Card.Text style={{color:"#F4EDE3"}}><RatingStar rating={review.rating}/></Card.Text>
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