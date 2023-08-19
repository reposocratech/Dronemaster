import React from 'react'
import './footerApp.scss'
import { Container } from 'react-bootstrap'
import logo_DroneMaster from '../../../public/dashboard_images/logo_DroneMaster.png'


export const FooterApp = () => {
    return (
        <Container fluid className='footer '>
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
            <div className='footer2'>
                <img className='logoFooter' src={logo_DroneMaster} alt="" />
                <div className='footerInfo'>
                    <p>Recursos</p>
                    <p>Acerca de</p>
                    <p>Cursos</p>
                </div>
                <div>

                </div>

            </div>

        </Container>
    )
}
