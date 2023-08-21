import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavBarApp from '../components/NavBar/NavBarApp'
import HomeApp from '../Pages/Home/HomeApp'
import RegisterForm from '../Pages/Users/RegisterForm/RegisterForm'
import LoginForm from '../Pages/Users/LoginForm/LoginForm'
import { AllCourses } from "../Pages/AllCourses/AllCourses";
import { AboutApp } from '../Pages/About/AboutApp'
import { FooterApp } from '../components/Footer/FooterApp'

const AppRoutes = () => {
  return (
    <Container fluid className='p-0'>
      <BrowserRouter>
        <NavBarApp />
        <Routes>
          <Route path='/' element={<HomeApp />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/allCourses' element={<AllCourses />} />
          <Route path='/about' element={<AboutApp />} />
        </Routes>
        <FooterApp />
      </BrowserRouter>
    </Container>
  )
}

export default AppRoutes