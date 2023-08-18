import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import './styles.css'

const AccountDetails = () => {

  const { userData } = useSelector(state => state.authInfo);

  return (
    <div className='accd-container'>
      <div>
        <div className='fw-bold mb-2'>Personal Details</div>
        <div>{userData.first_name} {userData.last_name}</div>
        <div>{userData.email}</div>
        <div>{userData.mobile ? userData.mobile[0] : ''}</div>
      </div>
    </div>
  )
}

export default AccountDetails