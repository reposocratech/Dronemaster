import React from 'react'
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBarApp.scss';
import logo_DroneMaster from '../../../public/dashboard_images/logo_DroneMaster.png'
import { FiSearch } from "react-icons/fi";


const NavBarApp = () => {

  return (
    <Navbar key={'lg'} expand={'lg'} className="navBar d-flex justify-content-end" >
      <Container fluid className='navContainer'>

        <Navbar.Brand as={Link} to='/'><img className='logo' src={logo_DroneMaster} alt="" /></Navbar.Brand>

        <Navbar.Toggle className='toogle' aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
        <Navbar.Offcanvas className='navOffCanvas'
          id={`offcanvasNavbar-expand-${'lg'}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='text-warning' id={`offcanvasNavbarLabel-expand-${'lg'}`}>
              DroneMaster
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='bodyOffCanvas ps-4 gap-3 d-flex-column d-lg-flex justify-content-lg-between align-items-center'>
            <div className='search d-flex align-items-center gap-1 px-2'>
              <FiSearch />
              <input
                type="text"
                className='border-bg-transparent border-0 bg-transparent w-50'
                placeholder='Buscar curso...'
              />
            </div>

            <div className='d-flex-column d-lg-flex gap-5'>

              <Nav className="justify-content-end gap-lg-2">
                <Nav.Link className='text-light' as={Link} to='/allCourses'>Cursos</Nav.Link>
                <Nav.Link className='text-light' as={Link} to='/about'>About</Nav.Link>
              </Nav>

              <div className='d-flex justify-content-center align-items-center gap-2'>
                <button className='btnOutline2 border-light'>Iniciar sesión</button>
                <button className='btnOutline2'>Registrarse</button>
              </div>
            </div>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavBarApp
