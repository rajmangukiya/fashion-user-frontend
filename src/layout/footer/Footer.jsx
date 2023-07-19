import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './footer.css'
const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='d-flex flex-column align-items-center mb-5'>
        <div className='footer-name fw-bold'>The Brand</div>
        <div className='footer-name'>About the brand</div>
        <div className='footer-name'>art-i-culate</div>
        <div className='footer-name'>Evenes</div>
        <div className='footer-name'>Journal</div>
        <div className='footer-name'>Stores</div>
        <div className='footer-name'>Press</div>
        <div className='footer-name'>Careers</div>
        <div className='footer-name'>T&C</div>
        <div className='footer-name'>Privacy policy</div>
      </div>
      <div className='d-flex flex-column align-items-center mb-5'>
        <div className='footer-name fw-bold'>Support</div>
        <div className='footer-name'>My Account</div>
        <div className='footer-name'>FAQs</div>
        <div className='footer-name'>Shipping & payments</div>
        <div className='footer-name'>Returns & exchanges</div>
        <div className='footer-name'>Track your order</div>
        <div className='footer-name'>Contact us</div>
      </div>
      <div className='d-flex flex-column align-items-center mb-5'>
        <div className='footer-name fw-bold'>Social</div>
        <div className='footer-name'>Instagram</div>
        <div className='footer-name'>Facebook</div>
        <div className='footer-name'>YouTube</div>
        <div className='footer-name'>LinkedIn</div>
      </div>
      <div>
        {/* <div className='footer-name fs-5'>A window to our world. */}
{/* Do sign up.</div> */}
        <input className='border-bottom border-1 border-dark py-1 w-100' placeholder='Email' />
      </div>
    </div>
  )
}

export default Footer