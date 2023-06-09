import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { remove } from '../../redux/reducer/cartReducer'
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi'
import { addToCart, decreaseFromCart, removeFromCart } from '../../redux/reducer/authReducer';
import { ApiPost } from '../../utils/ApiData';
import { useNavigate } from 'react-router-dom';
import BagDetails from './BagDetails';
import AddressDetails from './AddressDetails';
import PaymentDetails from './PaymentDetails';

const Cart = () => {

    const [selectedTab, setSelectedTab] = useState('bag')

    const { userData } = useSelector(state => state.authInfo);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const RenderElement = () => {
        switch (selectedTab) {
            case 'bag': return <BagDetails setSelectedTab={setSelectedTab} />
            case 'address': return <AddressDetails setSelectedTab={setSelectedTab} />
            case 'payment': return <PaymentDetails setSelectedTab={setSelectedTab} />
            default: return <div>Something's wrong</div>
        }
    }

    useEffect(() => {
      console.log('userData', userData.cart);
    }, [userData])
    

  return (
    <div className='w-100 p-5'>
        <div className='w-100 d-flex'>
            <BiArrowBack
                onClick={() => navigate(-1)}
                style={{color: '#A28E69', cursor: 'pointer'}}
                className='fs-2' />
            <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <div 
                    style={{color: `${selectedTab == 'bag' ? '#A28E69' : '#000000'}`, cursor: 'pointer'}} 
                    className={`${selectedTab == 'bag' ? 'fs-5' : ''}`}
                    onClick={() => setSelectedTab('bag')}
                >Bag</div>
                <div style={{width: '10%'}} className='border-bottom border-2 mx-4'></div>
                <div
                    style={{color: `${selectedTab == 'address' ? '#A28E69' : '#000000'}`, cursor: 'pointer'}} 
                    className={`${selectedTab == 'address' ? 'fs-5' : ''}`}
                    onClick={() => setSelectedTab('address')}
                >Address</div>
                <div style={{width: '10%'}} className='border-bottom border-2 mx-4'></div>
                <div
                    style={{color: `${selectedTab == 'payment' ? '#A28E69' : '#000000'}`, cursor: 'pointer'}} 
                    className={`${selectedTab == 'payment' ? 'fs-5' : ''}`}
                    onClick={() => setSelectedTab('payment')}
                >Payment</div>
            </div>
        </div>
        {
            <RenderElement />
        }
    </div>
  )
}

export default Cart