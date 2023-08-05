import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../layout'
import { Home, Item, Cart, Login, ItemListing, Error, MyAccount } from '../pages'

const Router = () => {

    const navigate = useNavigate()

    return (
        <div className='w-100'>
            <Layout>
                <Routes>
                    {/* <Route path="/category/:name" element={<Category />} /> */}
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/item/:itemId" element={<Item />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/collection" element={<ItemListing />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="*" element={<Error />} />
                    {/* <Route path="/" exact element={<Home />} /> */}
                </Routes>
            </Layout>
        </div>
    )
}

export default Router