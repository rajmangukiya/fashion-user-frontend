import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function BasicExample() {

  const navigate = useNavigate();

  const openHome = () => {
    navigate('/');
  }

  return (
    <Navbar fixed='top' className='shadow-sm' bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={openHome} className='me-5'>Fashion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link onClick={openHome} className='mx-3'>Home</Nav.Link> */}
            <NavDropdown className='mx-3' title="Saree" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1 Min Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Banarasi Saree
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Bollywood Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Party Wear Saree</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='mx-3' title="Lahenga" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1 Min Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Banarasi Saree
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Bollywood Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Party Wear Saree</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='mx-3' title="Dress" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1 Min Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Banarasi Saree
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Bollywood Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Party Wear Saree</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='mx-3' title="Gown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1 Min Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Banarasi Saree
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Bollywood Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Party Wear Saree</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='mx-3' title="Kurti" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1 Min Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Banarasi Saree
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Bollywood Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Party Wear Saree</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown className='mx-3' title="Wstern Kurti" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">1 Min Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Banarasi Saree
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Bollywood Saree</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Party Wear Saree</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;