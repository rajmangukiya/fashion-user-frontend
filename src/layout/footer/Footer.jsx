import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './footer.css'
const Footer = () => {
  return (
    <Container fluid style={{ backgroundColor: "#A28E69", maxWidth: "100%", color: "white", padding: "35px", marginBottom: 'auto' }}>
      <Row>
        <Col xs={4}>
          <h5>About Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis possimus blanditiis molestias dolores accusantium facilis sequi nemo,</p>
        </Col>
        <Col className='footer-col'>
          <h5>Info</h5>
          <div>
            <a href='/'>Search</a>
          </div>
          <div>
            <a href='/'>About Us</a>
          </div>
        </Col>
        <Col className='footer-col'>
          <h5>Explore</h5>
          <div>
            <a href='/'>shop</a>
          </div>
          <div>
            <a href='/'> Collection</a>
          </div>
          <div>
            <a href='/'>Contact</a>
          </div>
        </Col>
        <Col className='footer-col'>
          <h5>Quick Links</h5>
          <div>
            <a href='/'>New Arrival</a>
          </div>
          <div>
            <a href='/'>Saree</a>
          </div>
          <div>
            <a href='/'>Dresses</a>
          </div>
        </Col>
        <Col>
          <h5 className=''>Contact Us</h5>
          <Form.Control className='' width={7} size="sm" type="email" placeholder="Email Address" />
          <Button className='my-2' variant="light">Join</Button>
        </Col>
      </Row>
    </Container>)
}

export default Footer