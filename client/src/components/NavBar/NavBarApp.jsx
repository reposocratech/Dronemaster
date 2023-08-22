import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Navbar, Nav, Offcanvas, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavBarApp.scss';
import logo_DroneMaster from '../../../public/dashboard_images/logo_DroneMaster.png'
import { FiSearch } from "react-icons/fi";
import { DroneMasterContext } from '../../context/DroneMasterProvider';
import { useForm } from "react-hook-form";


const NavBarApp = () => {
  const [listCourses, setListCourses] = useState();
  const navigate = useNavigate()
  const { setCourse, token, user } = useContext(DroneMasterContext)

  const {
    register,
    handleSubmit,
    reset
  } = useForm()

  const onsubmit = (data) => {
    axios
      .get("http://localhost:4000/courses/allCourses")
      .then((res) => {
        setListCourses(res.data)
      })
      .catch((err) => console.log(err))

    let name = data.course_name;

    navigate('/allCourses')

    let courseFound = listCourses.filter(elem => elem.course_name.toLowerCase().includes(name.toLowerCase()))

    setCourse(courseFound)
    reset();
  }

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
              <form onSubmit={handleSubmit(onsubmit)} className='w-100'>
                <input
                  {...register("course_name", {
                    maxLength: 200,
                  })}
                  type="text"
                  className='border-bg-transparent border-0 bg-transparent text-light w-100'
                  placeholder='Buscar curso...'
                />
              </form>
            </div>

            <div className='d-flex-column d-lg-flex gap-5'>

              <Nav className="justify-content-end gap-lg-2">
                <Nav.Link onClick={() => {
                  setCourse()
                }} className='text-light' as={Link} to='/allCourses'>Cursos</Nav.Link>
                <Nav.Link className='text-light' as={Link} to='/about'>About</Nav.Link>
              </Nav>

              {!token && <div className='d-flex justify-content-center align-items-center gap-2'>
                <button onClick={() => navigate('/login')} className='btnOutline2 border-light'>Iniciar sesión</button>
                <button onClick={() => navigate('/register')} className='btnOutline2'>Registrarse</button>
              </div>}

              {token && <div onClick={() => { navigate("/student") }} className='d-flex justify-content-center align-items-center gap-2'>
                <div className='avatar'>
                  {user?.user_img ? <>
                    <img src="" alt="" />
                  </> : <>
                    <p className='initalName'>{user?.user_name.at(0).toUpperCase()}</p>
                  </>}

                </div>
                <button onClick={() => navigate('/register')} className='btnOutline2'>Cerrar sesión</button>
              </div>}

            </div>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavBarApp
