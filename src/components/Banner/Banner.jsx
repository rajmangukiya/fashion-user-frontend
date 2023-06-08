import React from 'react'
import '../Banner/styles.css'

const Banner = () => {
  return (
    <>
        <div className="banner-container">
            <img className='w-100 vh-100' src='https://sastabazzars.in/wp-content/uploads/2022/09/1900_x_730_anmazing_factory_benner_03_web.jpg' />
            <div className="banner-overlay">
                <button className='banner-button'>Buy Now</button>
            </div>
        </div>
    </>
  )
}

export default Banner