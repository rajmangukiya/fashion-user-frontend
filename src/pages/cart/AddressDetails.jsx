import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ApiPost } from '../../utils/ApiData';
import { Input } from '../../components/baseComponents/Utils';

const AddressDetails = ({ userData, setSelectedTab, addressDetails, setAddressDetails, getPriceDetails }) => {

    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        mobile: false,
        address: false,
        landmark: false,
        city: false,
        state: false,
        country: false,
        pincode: false
    })
    
    const addressDetailsHandler = (value) => {
        setErrorState(Object.keys(value)[0], false)
        setAddressDetails(prev => ({
            ...prev,
            ...value
        }))
    }

    const setErrorState = (key, value) => {
        let dummy = {}
        dummy[key] = value // have to find another way to remove dummy
        setError(prev => ({
            ...prev,
            ...dummy
        }))
    }

    const goToPaymentTab = () => {
        const isError = Object.keys(addressDetails).map(key => {
            console.log(addressDetails[key]);
            if(addressDetails[key] == "") {
                setErrorState(key, true)
                return 1
            }
            else return 0
        })
        .reduce((acc, cur) => acc + cur, 0)
        if(!isError) setSelectedTab('payment')
    }

  return (
    <div className='bg1-container d-flex align-items-start px-5 mx-5'>
            <div className='w-100 ad-address-container me-5'>
                <h6 className='mb-3'>Shipping address</h6>
                <div className='w-100 d-flex mb-3'>
                    <Input 
                        value = {addressDetails.firstName}
                        onChange = {(value) => addressDetailsHandler({firstName: value})}
                        placeholder = 'First name'
                        containerClassName = 'w-50 me-3'
                        inputClassName = 'ad-details'
                        isError = {error.firstName}
                        errorMessage = 'Enter value'
                    />
                    <Input 
                        value={addressDetails.lastName}
                        onChange={(value) => addressDetailsHandler({lastName: value})}
                        placeholder='Last name'
                        containerClassName = 'w-50'
                        inputClassName = 'ad-details'
                        isError = {error.lastName}
                        errorMessage = 'Enter value'
                    />
                </div>
                <Input 
                    value={addressDetails.email}
                    onChange={(value) => addressDetailsHandler({email: value})}
                    placeholder='Email address'
                    containerClassName = 'mb-3'
                    inputClassName = 'ad-details'
                    isError = {error.email}
                    errorMessage = 'Enter value'
                />
                <Input 
                    value={addressDetails.mobile}
                    onChange={(value) => addressDetailsHandler({mobile: value})}
                    placeholder='Mobile Number'
                    containerClassName = 'mb-3'
                    inputClassName = 'ad-details'
                    isError = {error.mobile}
                    errorMessage = 'Enter value'
                />
                <Input 
                    value={addressDetails.company}
                    onChange={(value) => addressDetailsHandler({company: value})}
                    placeholder='Company name'
                    containerClassName = 'mb-3'
                    inputClassName = 'ad-details'
                    isError = {error.company}
                    errorMessage = 'Enter value'
                />
                <Input 
                    value={addressDetails.address}
                    onChange={(value) => addressDetailsHandler({address: value})}
                    placeholder='Address'
                    containerClassName = 'mb-3'
                    inputClassName = 'ad-details'
                    isError = {error.address}
                    errorMessage = 'Enter value'
                />
                <Input 
                    value={addressDetails.landmark}
                    onChange={(value) => addressDetailsHandler({landmark: value})}
                    placeholder='Landmark'
                    containerClassName = 'mb-3'
                    inputClassName = 'ad-details'
                    isError = {error.landmark}
                    errorMessage = 'Enter value'
                />
                <div className='d-flex mb-3'>
                    <Input 
                        value = {addressDetails.city}
                        onChange = {(value) => addressDetailsHandler({city: value})}
                        placeholder = 'City'
                        containerClassName = 'w-50 me-3'
                        inputClassName = 'ad-details'
                        isError = {error.city}
                        errorMessage = 'Enter value'
                    />
                    <Input 
                        value = {addressDetails.pincode}
                        onChange = {(value) => addressDetailsHandler({pincode: value})}
                        placeholder = 'Pincode'
                        containerClassName = 'w-50'
                        inputClassName = 'ad-details'
                        isError = {error.pincode}
                        errorMessage = 'Enter value'
                    />
                </div>
                <div className='d-flex mb-3'>
                    <Input 
                        value = {addressDetails.state}
                        onChange = {(value) => addressDetailsHandler({state: value})}
                        placeholder = 'State'
                        containerClassName = 'w-50 me-3'
                        inputClassName = 'ad-details'
                        isError = {error.state}
                        errorMessage = 'Enter value'
                    />
                    <Input 
                        value = {addressDetails.country}
                        onChange = {(value) => addressDetailsHandler({country: value})}
                        placeholder = 'Country'
                        containerClassName = 'w-50'
                        inputClassName = 'ad-details'
                        isError = {error.country}
                        errorMessage = 'Enter value'
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
                    onClick={goToPaymentTab}
                >Continue to Shipping</div>
            </div>
        </div>
  )
}

export default AddressDetails