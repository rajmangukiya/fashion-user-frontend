import React, { useEffect, useState } from 'react'
import './styles.css'
import { CustomTabs } from '../../../components/baseComponents/Utils'
import { ApiPost } from '../../../utils/ApiData'

const OrderHistory = () => {

  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

  const orderStatus = [
    "pending",
    "dispatched",
    "delivered",
    "cancelled",
    "returned"
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'info'

      case 'dispatched':
        return 'primary'

      case 'delivered':
        return 'success'

      case 'cancelled':
        return 'danger'

      case 'returned':
        return 'dark'

      default:
        break;
    }
  }

  const handleOrderFilter = (_status) => {
    setFilteredOrders(orders.filter(order => order.status == _status))
  }

  const fetchOrders = async () => {
    const { data } = await ApiPost("order/getOrders", { merchantId: process.env.REACT_APP_MERCHANT });
    setOrders(data)
    setFilteredOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    console.log('orders', orders);
    console.log(orders[0]?.itemDetails);
  }, [orders])

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
      <CustomTabs
        tabList={orderStatus} // element should have name key in it
        onTabChange={handleOrderFilter}
        keyName=""
        defaultIndex={0}
        reRenderOn={[]}
        type="box"
      />
      <div className='oh-items-container border border-1 mt-3 text-center'>
        {
          filteredOrders.length
          ?
          filteredOrders?.map((order, index1) => 
            order?.itemDetails.map((itemDetail, index2) =>
              <div key={(filteredOrders.length * index1) + index2}>
                <div className='oh-item-container d-flex'>
                  <img className='me-5' src={itemDetail?.itemId?.images[0]} />
                  <div className='w-100 d-flex flex-column align-items-start'>
                    <div className='oh-item-title fs-5 fw-normal mb-1'>{itemDetail?.itemId?.title}</div>
                    <div className='oh-item-description mb-1'>{itemDetail?.itemId?.description?.length > 100 ? itemDetail?.itemId?.description?.slice(0, 50) + '...' : itemDetail?.itemId?.description}</div>
                    <div className='d-flex mb-3'>
                      <div className='oh-item-price fw-bold mb-1 me-3'>₹ {itemDetail?.itemId?.price}</div>
                      <div className='oh-item-size px-2 me-3 text-black border border-1 border-dark bg-opacity-75 d-flex align-items-center border'>{itemDetail?.size}</div>
                    </div>
                    <div className='oh-status d-flex align-items-center px-3'>
                      <div className={`bg-${getStatusColor(order.status)} oh-status-circle rounded-circle me-3`}></div>
                      <div className={`${getStatusColor(order.status)} py-1`}>{order?.status}</div>
                    </div>
                  </div>
                </div>
                {
                  index1 == filteredOrders.length - 1 && index2 == order?.itemDetails?.length - 1 ? <></> : <div className='border-bottom border-1 my-4'></div>
                }
              </div>)
          )
          :
          'No Orders Found'
        }
      </div>
    </div>
  )
}

export default OrderHistory