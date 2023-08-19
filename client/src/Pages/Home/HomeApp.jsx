import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './homeApp.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const initialCounterValue = {
  "TotalTeachers": 0,
  "TotalStudents": 0,
  "TotalCourse": 0
}

const HomeApp = () => {
  const [counter, setCounter] = useState(initialCounterValue)

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:4000/counter')
      .then((res) => {
        setCounter(res.data[0]);
      })
      .catch((err) => { console.log(err); })
  }, [])

  console.log(counter);

  return (
    <Container fluid className='home'>
      <Row>
        <Col className='homeInfo'>
          <div>
            <h1>COMIENZA EN EL MUNDO DE LOS <span>DRONES</span> CON NUESTROS CURSOS</h1>
            <p>Especializate en el sector mas demandado de Europa</p>
            <div className='py-4'>
              <button className='btnNormal' onClick={() => { navigate('/login') }}>Comenzar</button>
            </div>
          </div>
          <div className='allCounter'>
            <div>
              <h2 className='homeCounter'>{counter.TotalTeachers}</h2>
              <p className='userCounter'>Docentes</p>
            </div>
            <div>
              <h2 className='homeCounter'>{counter.TotalCourse}</h2>
              <p className='userCounter'>Cursos</p>
            </div>
            <div>
              <h2 className='homeCounter'>{counter.TotalStudents}</h2>
              <p className='userCounter'>Alumnos</p>
            </div>

          </div>
        </Col>
        <Col className='homeImage'>
          <div className='orangeCircle'></div>

        </Col>
      </Row>
    </Container>
  )
}

export default HomeApp
