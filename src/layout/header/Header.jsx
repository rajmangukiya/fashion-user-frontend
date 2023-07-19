import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsCart2 } from 'react-icons/bs'
import { BiUserCircle } from "react-icons/bi"
import { Badge, Dropdown } from 'react-bootstrap';
import AuthStorage from '../../utils/AuthStorage';
import { CiSearch } from 'react-icons/ci';
import { BsBag } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GrClose } from 'react-icons/gr';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import './styles.css'
import { useRef } from 'react';

function BasicExample() {

  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.authInfo);
  const isLogged = useSelector((state) => state.authInfo.isLogged);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState([]);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const dropdown = useRef(null)
  const hamIcon = useRef(null)
  const closeIcon = useRef(null)
  

  const categories = [
    {
      title: 'Clothing',
      subCategories: [
        'Sarees', 'Dresses', 'Tunic', 'Shirts & Tops', 'Kurtas', 'Anarkalis', 'Bottoms', 'Jackets', 'Abayas'
      ]
    },
    {
      title: 'Accessories',
      subCategories: [
        'Dresses', 'Tunic', 'Anarkalis', 'Bottoms', 'Abayas'
      ]
    },
    {
      title: 'Collections',
      subCategories: [
       'Shirts & Tops', 'Kurtas', 'Anarkalis', 'Bottoms', 'Jackets', 'Abayas'
      ]
    },
    {
      title: 'Featued',
      subCategories: [
        'Dresses', 'Tunic', 'Shirts & Tops', 'Kurtas', 'Anarkalis', 'Bottoms', 'Jackets'
      ]
    }
  ]

  const getCartCount = userData?.cart?.reduce((acc, value) => acc + value?.quantity, 0)

  const openHome = () => {
    navigate('/');
  }
  // const openCollection = () => {
  //   navigate('/collection');
  // }
  const showCart = () => {
    navigate('/cart')
  }

  // const showCollection = () => {
  //   navigate('/collection')
  // }

  // const getCartValue = () => {
  //   const userQuantity = userData?.cart?.reduce((acc, val) => {
  //     return acc + val.quantity
  //   }, 0) ?? 0
  //   return userQuantity
  // }

  const showDropdown = () => {
    dropdown.current.style.display = 'flex'
  }

  const hideDropDown = () => {
    dropdown.current.style.display = 'none'
  }

  const showDropdownMobile = () => {
    dropdown.current.style.display = 'flex'
    hamIcon.current.style.display = 'none'
    closeIcon.current.style.display = 'block'
  }

  const hideDropDownMobile = () => {
    dropdown.current.style.display = 'none'
    hamIcon.current.style.display = 'block'
    closeIcon.current.style.display = 'none'
  }

  const expandCategory = (index) => () => {
    if (window.innerWidth < '768') setIsCategoriesOpen(prevStatuses => prevStatuses.map((prevStatus, index2) => index2 == index ? !prevStatus : prevStatus))
  }

  const expandShop = () => {
    setIsShopOpen(prevIsShopOpen => !prevIsShopOpen)
  }

  const openMyAccount = () => {

  }

  const openSignin = () => {
    navigate('sign-in')
  }

  useEffect(() => {
    setIsCategoriesOpen(categories.map(_ => false))
  }, [])

  useEffect(() => {
    console.log('userData', userData);
  }, [userData])

  return (
    <div onMouseLeave={hideDropDown} className='navbar-container w-100'>
      <div className='navbar-main d-flex align-items-center justify-content-between'>
        <div onClick={openHome} className='brand-name fs-1 text-black'>Zivaanta</div>
        <div className='d-flex align-items-center'>
          <div onMouseEnter={showDropdown} className='navbar-buttons navbar-main-buttons navbar-shop-button text-black'>Shop</div>
          <div 
            onClick={isLogged ? openMyAccount : openSignin}
            className='navbar-buttons navbar-main-buttons mx-4 text-black'
          >{isLogged ? 'My Account' : 'Sign in'}</div>
          <CiSearch className='fs-5' />
          <div style={{cursor: 'pointer'}} className='ms-4 d-flex flex-column justify-content-center position-relative'>
            <div className='header-cart-count position-absolute'>{getCartCount}</div>
            <BsBag onClick={showCart} />
          </div>
          <div ref={hamIcon} className='navbar-ham' onClick={showDropdownMobile} >
            <RxHamburgerMenu className='ms-4 fs-5' />
          </div>
          <div ref={closeIcon} className='navbar-ham' style={{ display: 'none' }} onClick={hideDropDownMobile} >
            <GrClose className='ms-4 fs-5' />
          </div>
        </div>
      </div>
      <div ref={dropdown} className='navbar-dropdown pt-3 pb-5'>
          <div onClick={expandShop} className={`navbar-dropdown-shop-title-container d-flex justify-content-between align-items-center`}>
            <div className={`${isShopOpen ? 'fw-bold' : ''} navbar-buttons text-black mb-2`}>Shop</div>
            {
              isShopOpen
              ? <BsChevronUp className='navbar-dropdown-icon' />
              : <BsChevronDown className='navbar-dropdown-icon' />
            }
          </div>
          <div className={`${isShopOpen ? 'd-block' : 'd-none'} navbar-dropdown-buttons-container1 w-100`}>
          {
            categories.map((category, index) => (
              <div className='navbar-dropdown-buttons-container2'>
                <div onClick={expandCategory(index)} className='d-flex w-100 justify-content-between align-items-center py-2'>
                  <div className={`${isCategoriesOpen[index] ? 'fw-bold' : ''} navbar-buttons navbar-category-title text-black`}>{category?.title}</div>
                  {
                    isCategoriesOpen[index]
                    ? <BsChevronUp className='navbar-dropdown-icon' />
                    : <BsChevronDown className='navbar-dropdown-icon' />
                  }
                </div>
                <div className={`${isCategoriesOpen[index] ? 'd-block' : 'd-none'} navbar-dropdown-buttons-container3 mt-2`}>
                  {
                    category.subCategories.map(category => (
                      <div className='navbar-buttons text-black mb-2'>{category}</div>
                    ))
                  }
                </div>
              </div>
            ))
          }
          </div>
          <div className={`navbar-dropdown-shop-title-container d-flex justify-content-between align-items-center`}>
            <div 
              className='navbar-buttons text-black mt-2'
              onClick={isLogged ? openMyAccount : openSignin}
            >{isLogged ? 'My Account' : 'Sign in'}</div>
          </div>
      </div>
    </div>
  );
}

export default BasicExample;