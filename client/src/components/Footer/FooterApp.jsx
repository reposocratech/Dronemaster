import React from 'react'
import './footerApp.scss'
import { Container, Row } from 'react-bootstrap'
import logo_DroneMaster from '../../../public/dashboard_images/logo_DroneMaster.png'
import { AiOutlineWhatsApp, AiOutlineTwitter, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineYoutube } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


export const FooterApp = () => {
    const navigate = useNavigate()
    return (
        <Container fluid className='footer'>
            <Row className='d-flex-column justify-content-center'>
                <hr className='footerLine' />
                <div className='footer1'>
                    <p className='titleFooter1'>MEJORA TUS HABILIDADES PARA UN FUTURO MEJOR</p>
                    <h2>Solicita más información</h2>
                    <hr />
                    <p>Explora los cielos con confianza. Aprende a pilotar drones de manera segura y profesional con nuestros cursos especializados. ¡Eleva tus habilidades con nosotros!</p>
                    <button className='btnNormal'>Contáctanos</button>
                    <p>© 2023 DorneMaster SL</p>
                </div>
                <hr className='footerLine' />
                <div className='footer2 d-flex-column d-md-flex justify-content-md-between align-items-md-center text-center'>
                    <img className='logoFooter pb-3 pb-md-0' src={logo_DroneMaster} alt="" />
                    <div className='footerInfo pb-3 pb-md-0'>
                        <p onClick={() => { navigate('/') }}>Inicio</p>
                        <p onClick={() => { navigate('/about') }}>Acerca de</p>
                        <p onClick={() => { navigate('/allCourses') }}>Cursos</p>
                    </div>
                    <div className='footerLinks'>
                        <AiOutlineWhatsApp />
                        <AiOutlineTwitter />
                        <AiOutlineInstagram />
                        <AiOutlineLinkedin />
                        <AiOutlineYoutube />
                    </div>


                </div>
            </Row>


        </Container>
    )
}
