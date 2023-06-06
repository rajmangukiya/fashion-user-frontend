import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BsCart2 } from 'react-icons/bs'
import { BiUserCircle } from "react-icons/bi"
import {Badge} from 'react-bootstrap';
import AuthStorage from '../../utils/AuthStorage';

function BasicExample() {

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const openHome = () => {
    navigate('/');
  }

  const showCart = () => {
    navigate('/cart')
  }

  return (
    <>
    <Navbar fixed='top' className='shadow-sm' bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={openHome} className='me-5 '>Fashion</Navbar.Brand>
        <Nav className='order-lg-last'>
                <div style={{ display:"flex" }}>
                  <div>
                  <BsCart2 onClick={showCart} size={25}/>
                    <Badge style={{fontSize: '10px'}} bg="danger" className="start-10 translate-middle">
                      {cartItems.length}
                    </Badge>
                  </div>
                    <BiUserCircle onClick={showCart} size={25} />
                </div>
          </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav ">
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
            <Nav.Link onClick={openHome} className='mx-3'>Collections</Nav.Link>
            <Nav.Link onClick={openHome} className='mx-3'>Contact</Nav.Link>
            </Nav>
        </Navbar.Collapse>         
      </Container>
    </Navbar>
    </>
  );
}

export default BasicExample;