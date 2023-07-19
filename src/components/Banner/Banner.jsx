import React from 'react'
import '../Banner/styles.css'

const Banner = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center">
            <img style={{objectFit: 'cover'}} className='banner w-100' src='https://ampm.in/cdn/shop/files/Image-1.jpg?v=1686898796' />
            <a style={{fontFamily: 'Ysabeau Office, sans-serif'}} className='position-absolute text-dark bg-white px-5 py-2 fs-4' href='#category-carousel' >Explore</a>
            {/* <div className="banner-overlay">
            </div> */}
        </div>
    </>
  )
}

export default Banner