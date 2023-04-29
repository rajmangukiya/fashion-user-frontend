import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Category = () => {

    const { name } = useParams();
    const navigate = useNavigate();

    const items = [
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
        {
            name: 'Reception Wear Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png',
            mrp: 1599,
            price: 999
        },
    ]

    const openItem = (id = 1) => {
        navigate(`/item/${id}`);
    }

    return (
        <div>
            <div className='d-flex flex-column align-items-center'>
                <h1 className='my-5'>{name}</h1>
                <div className='d-flex w-100 justify-content-center flex-wrap'>
                    {
                        items.map(item => (
                            <div onClick={() => openItem()} className='item-container'>
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
            </div>
        </div>
    )
}

export default Category