import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import BagDetails from './BagDetails';
import AddressDetails from './AddressDetails';
import PaymentDetails from './PaymentDetails';

const Cart = () => {

    const [selectedTab, setSelectedTab] = useState('bag')

    const { userData } = useSelector(state => state.authInfo);
    const navigate = useNavigate()

    const [addressDetails, setAddressDetails] = useState({
        firstName: userData?.addressDetails?.first_name ?? userData?.first_name ?? '',
        lastName: userData?.addressDetails?.lastName ?? userData?.last_name ?? '',
        email: userData?.addressDetails?.email ?? userData?.email ?? '',
        mobile: userData?.addressDetails?.mobile ?? userData?.mobile ?? '',
        company: userData?.addressDetails?.company ?? '',
        address: userData?.addressDetails?.address ?? '',
        landmark: userData?.addressDetails?.landmark ?? '',
        city: userData?.addressDetails?.city ?? '',
        state: userData?.addressDetails?.state ?? '',
        country: userData?.addressDetails?.country ?? '',
        pincode: userData?.addressDetails?.pincode ?? ''
    })

    const getPriceDetails = () => {
        const priceDetails = {}
        priceDetails['totalMrp'] = Math.ceil(
            userData?.cart?.map(cartItem => cartItem?.item?.discountedPrice * cartItem?.quantity)?.reduce((acc, value) => acc + value, 0)
        )
        priceDetails['gst'] = Math.ceil(priceDetails.totalMrp * 0.18)
        priceDetails['shippingCharges'] = Math.ceil(100)
        priceDetails['totalAmount'] = Math.ceil(priceDetails.totalMrp + priceDetails.gst + priceDetails.shippingCharges)

        return priceDetails
    }

    const RenderElement = () => {
        switch (selectedTab) {
            case 'bag': return <BagDetails userData={userData} setSelectedTab={setSelectedTab} getPriceDetails={getPriceDetails} />
            case 'address': return <AddressDetails userData={userData} addressDetails={addressDetails} setAddressDetails={setAddressDetails} setSelectedTab={setSelectedTab} getPriceDetails={getPriceDetails} />
            case 'payment': return <PaymentDetails userData={userData}  addressDetails={addressDetails} getPriceDetails={getPriceDetails} />
            default: return <div>Something's wrong</div>
        }
    }

    // useEffect(() => {
    //   console.log('userData', userData);
    // }, [userData])

    return (
    <div className='w-100 h-100 py-5 mt-5'>
        <div className='cart-tab-container w-100 d-flex py-5'>
            <BiArrowBack
                onClick={() => navigate(-1)}
                className='cart-back-arrow fs-2 ms-5' />
            <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <div 
                    style={{color: `${selectedTab == 'bag' ? '#876952' : '#000000'}`, cursor: 'pointer'}} 
                    className={`cart-tab-title ${selectedTab == 'bag' ? 'fs-5' : ''}`}
                    onClick={() => setSelectedTab('bag')}
                >Bag</div>
                <div style={{width: '10%'}} className='cart-tab-line border-bottom border-2 mx-4'></div>
                <div
                    style={{color: `${selectedTab == 'address' ? '#876952' : '#000000'}`, cursor: 'pointer'}} 
                    className={`cart-tab-title ${selectedTab == 'address' ? 'fs-5' : ''}`}
                    onClick={() => setSelectedTab('address')}
                >Address</div>
                <div style={{width: '10%'}} className='cart-tab-line border-bottom border-2 mx-4'></div>
                <div
                    style={{color: `${selectedTab == 'payment' ? '#876952' : '#000000'}`}} 
                    className={`cart-tab-title ${selectedTab == 'payment' ? 'fs-5' : ''}`}
                    // onClick={() => setSelectedTab('payment')}
                >Payment</div>
            </div>
        </div>
        {RenderElement()}
    </div>
  )
}

export default Cart