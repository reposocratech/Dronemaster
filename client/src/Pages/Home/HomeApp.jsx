import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './homeApp.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { CourseCard } from '../../components/CardCourse/CourseCard'

const initialCounterValue = {
  TotalTeachers: 0,
  TotalStudents: 0,
  TotalCourse: 0,
};

const HomeApp = () => {
  const [counter, setCounter] = useState(initialCounterValue)
  const [topCourses, setTopCourses] = useState([])
  const [bestRatedCourses, setBestRatedCourses] = useState([])
  const [width, setWidth] = useState(0)
  const navigate = useNavigate()

  const currentWidth = () => {
    const widthScreen = document.body.clientWidth
    setWidth(widthScreen)
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/counter")
      .then((res) => {
        setCounter(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:4000/topCourses')
      .then((res) => {
        setTopCourses(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:4000/bestRatedCourses')
      .then((res) => {
        setBestRatedCourses(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  console.log(width);

  return (
    <Container fluid className="home">
      <Row>
        <Col className="homeInfo">
          <div>
            <h1>
              COMIENZA EN EL MUNDO DE LOS <span>DRONES</span> CON NUESTROS
              CURSOS
            </h1>
            <p>Especializate en el sector mas demandado de Europa</p>
            <div className="py-4">
              <button
                className="btnNormal"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Comenzar
              </button>
            </div>
          </div>
          <div className="allCounter">
            <div>
              <h2 className="homeCounter">{counter.TotalTeachers}</h2>
              <p className="userCounter">Docentes</p>
            </div>
            <div>
              <h2 className="homeCounter">{counter.TotalCourse}</h2>
              <p className="userCounter">Cursos</p>
            </div>
            <div>
              <h2 className="homeCounter">{counter.TotalStudents}</h2>
              <p className="userCounter">Alumnos</p>
            </div>
          </div>
        </Col>
        <Col className='homeImage'>
          <div className='orangeCircle'></div>
        </Col>
      </Row>
      <Row className='homeMessages'>
        <div className='d-flex justify-content-center justify-content-lg-start text-center text-lg-start'>
          <div className='homeOneMessage'>
            <h3>Aprende</h3>
            <p>Domina el arte del manejo de drones en diversos sectores</p>
          </div>
        </div>
        <div className='d-flex justify-content-center text-center text-lg-start'>
          <div className='homeOneMessage'>
            <h3>Explora</h3>
            <p>Descubre nuevas posibilidades con la tecnología de drones</p>
          </div>
        </div>

        <div className='d-flex justify-content-center justify-content-lg-end text-center text-lg-start'>
          <div className='homeOneMessage'>
            <h3>Eleva tus habilidades</h3>
            <p>Impulsa tu carrera con formación especializada en drones</p>
          </div>
        </div>

      </Row>
      <Row>
        <Col className='topCourses'>
          <h2 className='topCoursesTitle'>Últimos cursos</h2>
          <div className='d-flex justify-content-center gap-5 py-5'>
            {topCourses.map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              )
            })}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className='bestCourses'>
          <h2 className='bestCoursesTitle'>Cursos mejor valorados</h2>
          <div className='d-flex justify-content-center gap-5 py-5'>
            {bestRatedCourses.map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              )
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeApp;
