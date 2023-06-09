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
    <div className='d-flex mt-5 align-items-start justify-content-center'>
            <div className='w-50 me-5'>
                <h6 className='mb-3'>Shipping address</h6>
                <div className='d-flex mb-3'>
                    <input 
                        value={addressDetails.firstName}
                        onChange={(e) => addressDetailsHandler({firstName: e.target.value})}
                        placeholder='First name'
                        className='border border-1 w-50 p-3 rounded-1 me-3'
                    />
                    <input 
                        value={addressDetails.lastName}
                        onChange={(e) => addressDetailsHandler({lastName: e.target.value})}
                        placeholder='Last name'
                        className='border border-1 p-3 rounded-1 flex-grow-1'
                    />
                </div>
                <input 
                    value={addressDetails.email}
                    onChange={(e) => addressDetailsHandler({email: e.target.value})}
                    placeholder='Email address'
                    className='border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.mobile}
                    onChange={(e) => addressDetailsHandler({mobile: e.target.value})}
                    placeholder='Mobile number'
                    className='border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.company}
                    onChange={(e) => addressDetailsHandler({company: e.target.value})}
                    placeholder='company name (Optional)'
                    className='border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.address}
                    onChange={(e) => addressDetailsHandler({address: e.target.value})}
                    placeholder='Address'
                    className='border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <input 
                    value={addressDetails.landmark}
                    onChange={(e) => addressDetailsHandler({landmark: e.target.value})}
                    placeholder='Landmark'
                    className='border border-1 p-3 rounded-1 w-100 mb-3'
                />
                <div className='d-flex mb-3'>
                    <input 
                        value={addressDetails.city}
                        onChange={(e) => addressDetailsHandler({city: e.target.value})}
                        placeholder='City'
                        className='border border-1 w-50 p-3 rounded-1 me-3'
                    />
                    <input 
                        value={addressDetails.pincode}
                        onChange={(e) => addressDetailsHandler({pincode: e.target.value})}
                        placeholder='Pincode'
                        className='border border-1 p-3 rounded-1 flex-grow-1'
                    />
                </div>
                <div className='d-flex mb-3'>
                    <input 
                        value={addressDetails.state}
                        onChange={(e) => addressDetailsHandler({state: e.target.value})}
                        placeholder='State'
                        className='border border-1 w-50 p-3 rounded-1 me-3'
                    />
                    <input 
                        value={addressDetails.country}
                        onChange={(e) => addressDetailsHandler({country: e.target.value})}
                        placeholder='Country'
                        className='border border-1 p-3 rounded-1 flex-grow-1'
                    />
                </div>
            </div>
            <div style={{width: '30%'}} className='border border-1 p-5'>
            <div className='fs-5 mb-4'>Price Details</div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>Total MRP</div>
                    <div>₹ {getPriceDetails().totalMrp}</div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>GST</div>
                    <div>₹ {getPriceDetails().gst}</div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div>Shipping Charges</div>
                    <div>₹ {getPriceDetails().shippingCharges}</div>
                </div>
                <div className='border-bottom border-1 my-3'></div>
                <div className='d-flex justify-content-between'>
                    <div>Total Amount</div>
                    <div>₹ {getPriceDetails().totalAmount}</div>
                </div>
                <div 
                    style={{backgroundColor: '#A28E69', cursor: 'pointer'}} 
                    className='text-white py-2 text-center mt-4'
                    onClick={() => setSelectedTab('payment')}
                >Continue to Shipping</div>
            </div>
        </div>
  )
}

export default AddressDetails