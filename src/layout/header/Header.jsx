import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BsCart2 } from 'react-icons/bs'
import { BiUserCircle } from "react-icons/bi"
import {Badge, Dropdown} from 'react-bootstrap';
import AuthStorage from '../../utils/AuthStorage';

function BasicExample() {

  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.authInfo);
  const isLogged = useSelector((state) => state.authInfo.isLogged);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openHome = () => {
    navigate('/');
  }
  const openCollection = () => {
    navigate('/collection');
  }
  const showCart = () => {
    navigate('/cart')
  }

  const showCollection = () => {
    navigate('/collection')
  }

  const getCartValue = () => {
    const userQuantity = userData?.cart?.reduce((acc, val) => {
      return acc + val.quantity
    }, 0) ?? 0
    return userQuantity
  }

  return (
    <>
    <Navbar fixed='top' className='border-bottom border-1' color='white' bg="white" expand="lg" >
      <Container >
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={openHome} className='me-5 '>Fashion</Navbar.Brand>
        <div className='order-lg-last' style={{ display:"flex" }}>
          <div>
          <BsCart2 onClick={showCart} size={25}/>
            <Badge style={{fontSize: '10px'}} bg="danger" className="start-10 translate-middle">
              {getCartValue()}
            </Badge>
          </div>
          { windowWidth > 992 &&
            <NavDropdown  title={<BiUserCircle size={25}/>} id="basic-nav-dropdown">
              <NavDropdown.Item href="/">User</NavDropdown.Item>
              <NavDropdown.Item href="/">Orders</NavDropdown.Item>
              {
                isLogged ? 
                <NavDropdown.Item href="/">Sign Out</NavDropdown.Item>
                :
                <NavDropdown.Item href="/sign-in">Sign In</NavDropdown.Item>
              }
            </NavDropdown>
          }
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav "  />
        <Navbar.Collapse id="basic-navbar-nav " >
          <Nav className="me-auto">
            <NavDropdown className='mx-3' title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Header className='fw-bold'>Shop By Type</NavDropdown.Header>
              <NavDropdown.Item href="/">Lahenga</NavDropdown.Item>
              <NavDropdown.Item href="/">Dress</NavDropdown.Item>
              <NavDropdown.Item href="/">Saree</NavDropdown.Item>
              <NavDropdown.Header className='fw-bold'>Shop By Collection</NavDropdown.Header>
              <NavDropdown.Item href="/">All Collection</NavDropdown.Item>
              <NavDropdown.Item href="/">New Arrival</NavDropdown.Item>
              <NavDropdown.Item href="/">Best Selling</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={openCollection} className='mx-3'>Collections</Nav.Link>
            <Nav.Link onClick={openHome} className='mx-3'>Contact</Nav.Link>
            {windowWidth < 992 &&
              <NavDropdown className='mx-3' title={<BiUserCircle size={25}/>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/">User</NavDropdown.Item>
                <NavDropdown.Item href="/">Orders</NavDropdown.Item>
                <NavDropdown.Item href="/">Sign In</NavDropdown.Item>
                <NavDropdown.Item href="/">Sign Out</NavDropdown.Item>
            </NavDropdown>
            }
            </Nav>
        </Navbar.Collapse>         
      </Container>
    </Navbar>
    </>
  );
}

export default BasicExample;