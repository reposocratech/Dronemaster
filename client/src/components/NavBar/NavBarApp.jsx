import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import './NavBarApp.scss'




const NavBarApp = () => {
  return (
    <>

<Navbar key={'sm'} expand={'sm'} className=" nav bg-body-tertiary mb-3 " bg="dark" data-bs-theme="dark">
          <Container fluid >
            <Navbar.Brand as={Link} to='/'>Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'sm'}`} />
            <Navbar.Offcanvas bg="dark" data-bs-theme="dark"
              id={`offcanvasNavbar-expand-${'sm'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'sm'}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'sm'}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to='/'>Cursos</Nav.Link>
                  <Nav.Link as={Link} to='/'>About</Nav.Link>
                </Nav>
                <button className='btnOutline1'>Iniciar sesión</button>
                <button className='btnOutline2'>Registrarse</button>


              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      


      
    </>
  )
}

export default NavBarApp
