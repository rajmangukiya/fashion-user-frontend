import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const categories = [
        {
            name: 'Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png'
        },
        {
            name: 'Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png'
        },
        {
            name: 'Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png'
        },
        {
            name: 'Saree',
            image: 'https://sastabazzars.in/wp-content/uploads/2022/09/SAREES-306x456-1.png'
        },
    ]

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
    ]

    const openCategory = (name) => {
        navigate(`/category/${name}`)
    }

    const openItem = (id = 1) => {
        navigate(`/item/${id}`);
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            {
                window.innerWidth > 1000
                    ?
                    <img className='w-100' src='https://sastabazzars.in/wp-content/uploads/2022/09/1900_x_730_anmazing_factory_benner_03_web.jpg' />
                    :
                    <></>
            }

            {/* Category */}
            <div className='d-flex flex-column align-items-center'>
                <h2 className='my-4'>Shop By Category</h2>
                <div className='d-flex w-100 justify-content-center flex-wrap'>
                    {
                        categories.map(category => (
                            <div onClick={() => openCategory(category.name)} className='item-container'>
                                <img className='w-100' src={category.image} />
                                <p className='text-center fs-4 text-dark'>{category.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Trending */}
            <div className='d-flex flex-column align-items-center'>
                <h2 className='my-4'>Trending</h2>
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

            {/* New Arrivel */}
            <div className='d-flex flex-column align-items-center'>
                <h2 className='my-4'>New Arrivel</h2>
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

export default Home