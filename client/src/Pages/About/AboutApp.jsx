import React from 'react'
import './AboutApp.scss'
import { Container } from 'react-bootstrap'

export const AboutApp = () => {
    return (
        <Container fluid className='about'>
            <p className='text-center'>Bienvenidos a <span className='text-warning fs-5 fst-italic'>DroneMaster</span>, tu destino líder en educación y capacitación especializada en el fascinante mundo de los drones aplicados a la agricultura, cuerpos de seguridad y bomberos. Nos enorgullece ser la principal fuente de conocimiento y habilidades para aquellos que desean dominar las habilidades avanzadas necesarias para operar drones en contextos cruciales y específicos.</p>

            <div className='paragraph'>
                <h3 className='text-warning text-center text-md-start'>Nuestra Misión</h3>
                <p>Nuestra misión es fomentar la innovación y el progreso en sectores vitales como la agricultura, cuerpos de seguridad y bomberos, al proporcionar una plataforma educativa de vanguardia que capacite a profesionales y entusiastas con las destrezas necesarias para aprovechar al máximo las capacidades de los drones. Estamos comprometidos a brindar conocimientos prácticos y teóricos de alta calidad, que permitan a nuestros estudiantes convertirse en líderes en sus respectivas áreas, impulsando el cambio positivo y la eficiencia en sus operaciones diarias.</p>
            </div>

            <div className='paragraph'>
                <h3 className='text-warning text-center text-md-start'>Nuestros Cursos</h3>
                <p>Ofrecemos una amplia gama de cursos especializados que abarcan desde los fundamentos básicos hasta las técnicas avanzadas en el uso de drones en la agricultura, operaciones de seguridad y situaciones de emergencia. Nuestros cursos son diseñados y enseñados por expertos altamente calificados con una amplia experiencia en sus campos respectivos. Cubrimos temas cruciales como la planificación de vuelo, captura de datos, análisis de imágenes, mantenimiento de drones y mucho más.</p>
            </div>

            <div className='paragraph'>
                <h3 className='text-warning text-center text-md-start'>Experiencia Práctica</h3>
                <p>Entendemos que la práctica es esencial para el aprendizaje efectivo. Por ello, hemos incorporado experiencias prácticas y escenarios realistas en nuestros cursos. Los estudiantes tendrán la oportunidad de poner en práctica lo aprendido a través de simulaciones y proyectos que reflejen situaciones de la vida real en la agricultura moderna y en operaciones de seguridad y rescate.</p>
            </div>

            <div className='paragraph'>
                <h3 className='text-warning text-center text-md-start'>Comunidad y Colaboración</h3>
                <p>En <span className='text-warning fs-5 fst-italic'>DroneMaster</span>, creemos en la importancia de la colaboración y el intercambio de conocimientos. Por eso, hemos creado una comunidad vibrante donde los estudiantes pueden interactuar, compartir ideas y experiencias, y aprender unos de otros. Fomentamos la conexión entre profesionales y entusiastas de la agricultura y la seguridad, creando un espacio en el que puedan crecer juntos y ampliar sus horizontes.</p>
            </div>

            <div className='paragraph'>
                <h3 className='text-warning text-center text-md-start'>Compromiso con la Excelencia</h3>
                <p>Nuestro compromiso con la excelencia se refleja en cada aspecto de nuestra plataforma, desde el contenido del curso hasta la experiencia del usuario. Buscamos constantemente formas de mejorar y evolucionar para asegurarnos de que nuestros estudiantes reciban la mejor educación posible en el emocionante campo de los drones.</p>

                <p>Únete a nosotros en <span className='text-warning fs-5 fst-italic'>DroneMaster</span> y descubre cómo los drones están transformando la agricultura y revolucionando las operaciones de seguridad y rescate. ¡Prepárate para despegar hacia un futuro lleno de posibilidades infinitas!</p>
            </div>

            <p className='text-center text-warning fs-6 pt-4'>¡Explora, Aprende, Lidera con DroneMaster!</p>

        </Container>
    )
}

