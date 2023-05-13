import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BsCart2} from 'react-icons/bs'
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
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={openHome} className='me-5'>Fashion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link onClick={openHome} className='mx-3'>Home</Nav.Link> */}
            <NavDropdown className='mx-3' title="categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Lahenga</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Dress</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Gown</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Kurti</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Western Kurti</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          <Nav>
                <div onClick={showCart}>
                  <BsCart2 size={25}/>
                    <Badge style={{fontSize: '10px'}} bg="danger" className="start-10 translate-middle">
                      {cartItems.length}
                    </Badge>
                </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

     {/* Cart Side Panel */}
    {/* <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
         
     </Offcanvas.Body>
    </Offcanvas> */}
    </>
  );
}

export default BasicExample;