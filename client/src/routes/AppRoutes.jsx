import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBarApp from '../components/NavBar/NavBarApp'
import HomeApp from '../Pages/Home/HomeApp'
import { Container } from 'react-bootstrap'


const AppRoutes = () => {
  return (
    <Container fluid className='p-0'>

        <BrowserRouter>

            <NavBarApp/>

            <Routes>

            <Route path='/' element={<HomeApp/>}/>


            </Routes>
        
        </BrowserRouter>
      
    </Container>
  )
}

export default AppRoutes
