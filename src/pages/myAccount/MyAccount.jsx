import React from 'react'
import { CustomTabs } from '../../components/baseComponents/Utils'
import './styles.css'

const MyAccount = () => {
    const orderStatus = [
        { name: 'On the way'},
        { name: 'Delivered'},
        { name: 'Cancelled'},
        { name: 'Returned'}
    ]

    const onTabChange = () => {

    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'On the way':
                return 'border-primary text-primary'

            case 'Delivered':
                return 'border-success text-success'

            case 'Cancelled':
                return 'border-danger text-danger'

            case 'Returned':
                return 'border-dark text-dark'
        
            default:
                break;
        }
    }

    return (
        <div style={{marginTop: '110px'}} className='pt-5 d-flex flex-column justify-content-center align-items-center mb-5'>
            <CustomTabs
                tabList = {orderStatus} // element should have name key in it
                onTabChange = {onTabChange}
                keyName = "name"
                defaultIndex = {0}
                reRenderOn = {[]}
            />
            <div className='ma1-items-container border border-1 p-5 me-3 mt-5'>
                {
                    orderStatus?.map((status, index) => 
                    <div key={index}>
                        <div className='ma1-item-container d-flex'>
                            <img className='me-5' src={'https://cdn.shopify.com/s/files/1/0073/6123/2978/files/545150_2_540x.jpg?v=1684548780'} />
                            <div className='w-100 d-flex flex-column align-items-start'>
                                <div className='ma1-item-title fs-5 fw-normal mb-1'>{'Namita Flair Kurti'}</div>
                                <div className='ma1-item-description mb-1'>{'Blue Life\'s new Rockstar Romper features a wrap front.'}</div>
                                <div className='d-flex mb-3'>
                                    <div className='ma1-item-price fw-bold mb-1 me-3'>₹ {1599}</div>
                                    <div className='ma1-item-size px-2 me-3 text-black border border-1 border-dark bg-opacity-75 d-flex align-items-center border'>{'S'}</div>
                                </div>
                                <div className={`${getStatusColor(status.name)} ma1-status px-3 py-1 border`}>{status.name}</div>
                            </div>
                        </div>
                        {
                            orderStatus.length == (index + 1) ? <></> : <div className='border-bottom border-1 my-4'></div>
                        }
                    </div>)
                }
            </div>
        </div>
    )
}

export default MyAccount