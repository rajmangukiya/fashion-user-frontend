import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from '../layout'
import { Category, Home, Item, Cart, Login, ItemListing } from '../pages'
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'

const Router = () => {

    const navigate = useNavigate()
    return (
        <div className='w-100'>
            <Layout>
                <ClerkProvider
                    publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}
                    navigate={(to) => navigate(to)}
                >
                    <Routes>
                        <Route
                            path="/sign-in"
                            element={<div className='vh-100 d-flex justify-content-center align-items-center'>
                                <SignIn routing="path" path="/sign-in" />
                            </div>}
                        />
                        <Route path="/category/:name" element={<Category />} />
                        <Route path="/item/:id" element={<Item />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/collection" element={<ItemListing />} />
                        {/* <Route path="/" exact element={<Home />} /> */}
                    </Routes>
                </ClerkProvider>
            </Layout>
        </div>
    )
}

export default Router