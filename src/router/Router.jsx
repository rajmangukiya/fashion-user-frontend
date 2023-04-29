import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import { Category, Home, Item } from '../pages'

const Router = () => {



    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:name" element={<Category />} />
                    <Route path="/item/:id" element={<Item />} />
                </Routes>
            </Layout>
        </div>
    )
}

export default Router