import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout = ({ children, ...props }) => {

    return (
        <div>
            <Header />
            <div className='pt-5' {...props}>{children}</div>
            <Footer />
        </div>
    )
};

export default Layout;