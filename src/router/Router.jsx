import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import { Category, Home, Item, Cart, Login, ItemListing } from '../pages'

const Router = () => {
    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/category/:name" element={<Category />} />
                    <Route path="/item/:id" element={<Item />} />
                    <Route path="/items" element={<ItemListing />} />
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/cart" element={<Cart />} />
                    {/* <Route path="/" exact element={<Home />} /> */}
                </Routes>
            </Layout>
        </div>
    )
}

export default Router