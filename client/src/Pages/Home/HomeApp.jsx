
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../AllCourses/allCoursesStyle.scss";
import "./homeApp.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "../../components/CardCourse/CourseCard";
import drone_home from "../../../public/dashboard_images/drone_home.png";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const initialCounterValue = {
  TotalTeachers: 0,
  TotalStudents: 0,
  TotalCourse: 0,
};

const HomeApp = () => {
  const [counterInfo, setCounterInfo] = useState(initialCounterValue);
  const [topCourses, setTopCourses] = useState([]);
  const [bestRatedCourses, setBestRatedCourses] = useState([]);
  const [width, setWidth] = useState(document.body.clientWidth);
  const [counter, setCounter] = useState(0);
  const [counterRatio, setCounterRatio] = useState(1);
  const [counter1, setCounter1] = useState(0);
  const [counterRatio1, setCounterRatio1] = useState(1);
  const navigate = useNavigate()


  const currentWidth = () => {
    const widthScreen = document.body.clientWidth;
    setWidth(widthScreen);
  };

  useEffect(() => {
    window.addEventListener("resize", currentWidth);

    return () => {
      window.removeEventListener("resize", currentWidth);
    };
  }, [width]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/counter")
      .then((res) => {
        setCounterInfo(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/topCourses")
      .then((res) => {
        setTopCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/bestRatedCourses")
      .then((res) => {
        setBestRatedCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && window.innerWidth < 1100) {
        setCounterRatio(1);
        setCounterRatio1(1);
      } else if (window.innerWidth >= 1100 && window.innerWidth < 1400) {
        setCounterRatio(2);
        setCounterRatio1(2);
      } else if (window.innerWidth >= 1400 && window.innerWidth < 1700) {
        setCounterRatio(3);
        setCounterRatio1(3);
      } else if (window.innerWidth >= 1700) {
        setCounterRatio(4);
        setCounterRatio1(4);
      }
    };

    handleResize(); // Call initially
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container fluid className="home">
      {width > 991 && <Row>
        <Col className="homeInfo">
          <div>
            <h1>
              COMIENZA EN EL MUNDO DE LOS <span>DRONES</span> CON NUESTROS
              CURSOS
            </h1>
            <p>Especializate en el sector mas demandado de Europa</p>
            <div className="py-4">
              <button className="btnNormal" onClick={() => { navigate('/login') }}>
                Comenzar
              </button>
            </div>
          </div>
          <div className="allCounter pe-4 py-5">
            <div>
              <h2 className="homeCounter">{counterInfo.TotalTeachers}</h2>
              <p className="userCounter">Docentes</p>
            </div>
            <div>
              <h2 className="homeCounter">{counterInfo.TotalCourse}</h2>
              <p className="userCounter">Cursos</p>
            </div>
            <div>
              <h2 className="homeCounter">{counterInfo.TotalStudents}</h2>
              <p className="userCounter">Alumnos</p>
            </div>
          </div>
        </Col>
        <Col className='homeImage'>
          <div className='orangeCircle d-flex justify-content-center align-items-center'>
            <img className='drone_img' src={drone_home} alt="" />
          </div>
        </Col>
      </Row>}
      {width < 992 && <Row>
        <Col className="homeInfoMobile">
          <div className='infoLabel d-flex justify-content-between'>
            <div className=' w-md-50 px-3'>
              <h1 className='text-center'>
                COMIENZA EN EL MUNDO DE LOS <span>DRONES</span> CON NUESTROS
                CURSOS
              </h1>
              <p className='text-center'>Especializate en el sector mas demandado de Europa</p>
              <div className="pt-4 text-center">
                <button
                  className="btnNormal bg-dark"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Comenzar
                </button>
              </div>
            </div>
          </div>
        </Col>
        <div className="allCounter d-flex justify-content-center px-5 pt-0 pt-md-4 pb-5 pb-lg-5">
          <div>
            <h2 className="homeCounter">{counterInfo.TotalTeachers}</h2>
            <p className="userCounter">Docentes</p>
          </div>
          <div>
            <h2 className="homeCounter">{counterInfo.TotalCourse}</h2>
            <p className="userCounter">Cursos</p>
          </div>
          <div>
            <h2 className="homeCounter">{counterInfo.TotalStudents}</h2>
            <p className="userCounter">Alumnos</p>
          </div>
        </div>
      </Row>}
      <div className='homeMessages d-flex-column justify-content-center justify-content-lg-start text-center text-lg-start'>
        <div className='homeOneMessage'>
          <h3>Aprende</h3>
          <p>Domina el arte del manejo de drones en diversos sectores</p>
        </div>
        <div className="d-flex justify-content-center text-center text-lg-start">
          <div className="homeOneMessage">
            <h3>Explora</h3>
            <p>Descubre nuevas posibilidades con la tecnología de drones</p>
          </div>
        </div>
        <div className='d-flex justify-content-center justify-content-lg-end text-center text-lg-start'>
          <div className='homeOneMessage pb-0'>
            <h3>Eleva tus habilidades</h3>
            <p>Impulsa tu carrera con formación especializada en drones</p>
          </div>
        </div>
      </div>
      <div className='allCoursesContainer p-0 px-sm-5'>
        <div className="categoryContainer">
          <h2 className="categoryTitle text-center text-md-start">Últimos cursos</h2>
          <div className="courseCardContainerWrapper">
            {counter !== 0 ?
              <div className="navigationButtonContainerLeft">
                <MdNavigateBefore
                  className="navigationButton"
                  onClick={() => setCounter(counter - counterRatio)}
                />
              </div> : <div className="navigationButtonContainerLeft">
                <MdNavigateBefore
                  className="navigationButton opacity-0"
                />
              </div>
            }
            <div className="courseCardContainer">
              {topCourses?.slice(counter, counter + counterRatio).map((elem) => {
                return (
                  <CourseCard key={elem.course_id} oneCourse={elem} />
                )
              })}
            </div>
            {counter + counterRatio < topCourses?.length ?
              <div className="navigationButtonContainerRight">
                <MdNavigateNext
                  className="navigationButton"
                  onClick={() => setCounter(counter + counterRatio)}
                />
              </div> : <div className="navigationButtonContainerRight">
                <MdNavigateNext
                  className="navigationButton opacity-0"
                />
              </div>
            }
          </div>
        </div>
        <div className="categoryContainer pt-4">
          <h2 className="categoryTitle text-center text-md-start">Cursos mejor valorados</h2>
          <div className="courseCardContainerWrapper">
            {counter1 !== 0 ?
              <div className="navigationButtonContainerLeft">
                <MdNavigateBefore
                  className="navigationButton"
                  onClick={() => setCounter1(counter1 - counterRatio1)}
                />
              </div> : <div className="navigationButtonContainerLeft">
                <MdNavigateBefore
                  className="navigationButton opacity-0"
                />
              </div>
            }
            <div className="courseCardContainer">
              {bestRatedCourses?.slice(counter1, counter1 + counterRatio1).map((elem) => {
                return (
                  <CourseCard key={elem.course_id} oneCourse={elem} />
                )
              })}
            </div>
            {counter1 + counterRatio1 < bestRatedCourses?.length ?
              <div className="navigationButtonContainerRight">
                <MdNavigateNext
                  className="navigationButton"
                  onClick={() => setCounter1(counter1 + counterRatio1)}
                />
              </div> : <div className="navigationButtonContainerRight">
                <MdNavigateNext
                  className="navigationButton opacity-0"
                />
              </div>
            }
          </div>
        </div>
      </div>
    </Container >
  );

export default HomeApp;

