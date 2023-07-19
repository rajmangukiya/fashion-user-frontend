import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ApiPost } from '../../utils/ApiData';

const AddressDetails = ({ userData, setSelectedTab, addressDetails, setAddressDetails, getPriceDetails }) => {

    const addressDetailsHandler = (value) => {
        setAddressDetails(prev => ({
            ...prev,
            ...value
        }))
    }


  return (
    <div className='bg1-container d-flex align-items-start px-5 mx-5'>
            <div className='w-100 ad-address-container me-5'>
                <h6 className='mb-3'>Shipping address</h6>
                <div className='w-100 d-flex mb-3'>
                    <input 
                        value={addressDetails.firstName}
                        onChange={(e) => addressDetailsHandler({firstName: e.target.value})}
                        placeholder='First name'
                        className='ad-details border border-1 w-50 p-3 rounded-1 me-3'
                    />
                    <input 
                        value={addressDetails.lastName}
                        onChange={(e) => addressDetailsHandler({lastName: e.target.value})}
                        placeholder='Last name'
                        className='ad-details border border-1 w-50 p-3 rounded-1'
                    />
                </div>
                <input 
                    value={addressDetails.email}
                    onChange={(e) => addressDetailsHandler({email: e.target.value})}
                    placeholder='Email address'
                    className='ad-details border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.mobile}
                    onChange={(e) => addressDetailsHandler({mobile: e.target.value})}
                    placeholder='Mobile number'
                    className='ad-details border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.company}
                    onChange={(e) => addressDetailsHandler({company: e.target.value})}
                    placeholder='company name (Optional)'
                    className='ad-details border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.address}
                    onChange={(e) => addressDetailsHandler({address: e.target.value})}
                    placeholder='Address'
                    className='ad-details border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.landmark}
                    onChange={(e) => addressDetailsHandler({landmark: e.target.value})}
                    placeholder='Landmark'
                    className='ad-details border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <div className='d-flex mb-3'>
                    <input 
                        value={addressDetails.city}
                        onChange={(e) => addressDetailsHandler({city: e.target.value})}
                        placeholder='City'
                        className='ad-details border border-1 w-50 p-3 rounded-1 me-3'
                    />
                    <input 
                        value={addressDetails.pincode}
                        onChange={(e) => addressDetailsHandler({pincode: e.target.value})}
                        placeholder='Pincode'
                        className='ad-details border border-1 w-50 p-3 rounded-1'
                    />
                </div>
                <div className='d-flex mb-3'>
                    <input 
                        value={addressDetails.state}
                        onChange={(e) => addressDetailsHandler({state: e.target.value})}
                        placeholder='State'
                        className='ad-details border border-1 w-50 p-3 rounded-1 me-3'
                    />
                    <input 
                        value={addressDetails.country}
                        onChange={(e) => addressDetailsHandler({country: e.target.value})}
                        placeholder='Country'
                        className='ad-details border border-1 w-50 p-3 rounded-1'
                    />
                </div>
            </div>
            <div className='bg1-price-container border border-1 flex-grow-1 p-5'>
                <div className='bg1-price-title fs-5 mb-4'>Price Details</div>
                <div className='bg1-text-container d-flex justify-content-between mb-1'>
                    <div>Total MRP</div>
                    <div>₹ {getPriceDetails().totalMrp}</div>
                </div>
                <div className='bg1-text-container d-flex justify-content-between mb-1'>
                    <div>GST</div>
                    <div>₹ {getPriceDetails().gst}</div>
                </div>
                <div className='bg1-text-container d-flex justify-content-between mb-1'>
                    <div>Shipping Charges</div>
                    <div>₹ {getPriceDetails().shippingCharges}</div>
                </div>
                <div className='border-bottom border-1 my-3'></div>
                <div className='bg1-text-container d-flex justify-content-between'>
                    <div>Total Amount</div>
                    <div>₹ {getPriceDetails().totalAmount}</div>
                </div>
                <div 
                    style={{backgroundColor: '#876952', cursor: 'pointer'}} 
                    className='bg1-text-container text-white py-2 text-center mt-4'
                    onClick={() => setSelectedTab('address')}
                >Continue to Shipping</div>
            </div>
        </div>
  )
}

export default AddressDetails