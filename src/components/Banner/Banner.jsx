import React from 'react'
import '../Banner/styles.css'

const Banner = () => {
  return (
    <>
        <div className="d-flex justify-content-center align-items-center">
            <img style={{objectFit: 'cover'}} className='banner w-100' src='https://cdn.shopify.com/s/files/1/0245/6825/files/mr_parker_fall_hero-2.jpg?v=1637270202&width=1600' />
            <a className='position-absolute text-dark bg-white px-5 py-2 fs-4' href='#category-carousel' >Explore</a>
            {/* <div className="banner-overlay">
            </div> */}
        </div>
    </>
  )
}

export default Banner