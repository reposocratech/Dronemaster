import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { saveLocalStorageDroneMaster } from "../../../helper/localStorageDroneMaster";
import { DroneMasterContext } from "../../../context/DroneMasterProvider";
import "./LoginForm.scss";
import { Col, Container, Row } from "react-bootstrap";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { setUser, setIsLogged } = useContext(DroneMasterContext);

  const onSubmit2 = (data) => {
    axios

      .post("http://localhost:4000/login", data)
      .then((res) => {
        console.log("result.data.user/////////////", res),
          saveLocalStorageDroneMaster("token", res.data.token);
        setUser(res.data.user)
        setIsLogged(true)

        const type = res.data.user.type;
        if (type === 0) {
          navigate("/student");
        } else if (type === 1) {
          navigate("/teacher");
        } else if (type === 2) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="main">
      {/* HOME */}
      <Row className="homeform">
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
              <h2 className="homeCounter">6</h2>
              <p className="userCounter">Docentes</p>
            </div>
            <div>
              <h2 className="homeCounter">5</h2>
              <p className="userCounter">Cursos</p>
            </div>
            <div>
              <h2 className="homeCounter">4</h2>
              <p className="userCounter">Alumnos</p>
            </div>
          </div>
        </Col>
        <Col className="homeImage">
          <div className="orangeCircle"></div>
        </Col>
      </Row>

      <Row className="formposition">
        <Col className="formContainer col-4">
          <div className="text-group2">
            <form onSubmit={handleSubmit(onSubmit2)}>
              <input
                {...register("email", {
                  required: "Email must be completed",
                  maxLength: 200,
                })}
                placeholder="email"
                autoComplete="off"
                type="email"
                className="input-user"
              />

              <p>{errors.email?.message}</p>

              <input
                {...register("password", {
                  required: "Password must be completed",
                })}
                placeholder="Contraseña"
                autoComplete="off"
                type="password"
                className="input-user"
              />

              <p>{errors.password?.message}</p>

              <Col className="d-flex justify-content-center m-3">
                <button className="btnLogin"> Aceptar</button>
                <button className="btnLogin" onClick={() => navigate("/")}>
                  {" "}
                  Cancelar
                </button>
              </Col>
              <Col>
                <p className="formas-parte-de gap-2">
                  <span className="text-wrapper">
                    ¿Formas parte de nuetra?{" "}
                  </span>
                  <Link to="/register" className="span">
                    Inicia Sesion
                  </Link>
                </p>
              </Col>
            </form>
          </div>

          <Col className="text-group col-4">
            <div className="welcome-title">¡Bienvenido de vuelta!</div>
            <div className="text-paragraph-cont">
              <p className="welcome-paragraph">
                Estamos emocionados por tenerte aqui nuevamente
              </p>
              <p className="text-wrapper">
                Ingresa y disfruta de tu experiencia
              </p>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
