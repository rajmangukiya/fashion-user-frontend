import React, { useState } from 'react'
import './styles.css'
import AccountDetails from './accountDetails/AccountDetails'
import OrderHistory from './orderHistory/OrderHistory'
import { useDispatch } from 'react-redux'
import { logoutAction, clearCart } from '../../redux/reducer/authReducer'
import { useNavigate } from 'react-router-dom'

const MyAccount = () => {
    const [selectedTab, setSelectedTab] = useState(1)

    const myAccountTabs = ['Account Details', 'Order History']

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onTabChange = (index) => () => {
        setSelectedTab(index)
    }

    const logout = () => {
        dispatch(logoutAction())
        dispatch(clearCart())
        navigate('/')
    }

    const renderComponent = () => {
        switch (myAccountTabs[selectedTab]) {
            case 'Account Details':
                return <AccountDetails />

            case 'Order History':
                return <OrderHistory />

            default:
                break;
        }
    }

    return (
        <div style={{ marginTop: '110px' }} className='pt-5 mb-5'>
            <div className='ct-container d-flex'>
                {
                    [...myAccountTabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={onTabChange(index)}
                            className={`${selectedTab === index ? 'line-selected-tab box-selected-tab' : ''} line-category-tab box-category-tab text-nowrap`}
                        >
                            {tab}
                        </div>
                    )),
                    <div
                        key={myAccountTabs.length}
                        onClick={logout}
                        className={`line-category-tab box-category-tab`}
                    >
                        Logout
                    </div>
                    ]
                }
            </div>
            {renderComponent()}
        </div>
    )
}

export default MyAccount