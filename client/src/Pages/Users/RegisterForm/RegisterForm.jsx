import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.scss";
import { Container, Row, Col } from "react-bootstrap";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_name: "",
      user_lastname: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(true);

  const onSubmit = (data) => {
    axios

      .post("http://localhost:4000/students/registerStudent", data)
      .then((result) => console.log(result))
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

      {/* FORM DE REGISTER */}
      <Row className="formposition">
        <Col className="formContainer ">
          <div className="text-group col-4">
            <div className="welcome-title">¡Únete a nosotros!</div>
            <div className="text-paragraph-cont">
              <p className="welcome-paragraph">
                Estamos encantados de darte la bienvenida.
              </p>
              <p className="text-wrapper">
                Regístrate y comienza a ser parte de nuestra comunidad.
                ¡Esperamos verte pronto!
              </p>
            </div>
          </div>

          <Col className="text-group2 col-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  {...register("user_name", {
                    required: "Must be completed",
                    maxLength: 50,
                  })}
                  placeholder="Insert your name"
                  type="text"
                  className="input-user"
                  autoComplete="off"
                />
                <p>{errors.firstName?.message}</p>
              </div>
              <input
                {...register("user_lastname", {
                  required: "Must be completed",
                  maxLength: 1000,
                })}
                placeholder="Last Name"
                type="text"
                className="input-user"
                autoComplete="off"
              />

              <p>{errors.lastName?.message}</p>
              <input
                {...register("email", {
                  required: "Must be completed",
                  maxLength: 200,
                })}
                placeholder="Email"
                type="email"
                autoComplete="off"
                className="input-user"
              />
              <p>{errors.email?.message}</p>

              <input
                {...register("password", {
                  required: "Must be completed",
                  /*                   pattern: {
                    value: /^[A-Za-z]+$/i,
                    maxLength: 150,
                    message: "Must contain minus, MAYS,, number and Symbol",
                  }, */
                })}
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
                className="input-user"
              />
              <p>{errors.password?.message}</p>

              <Col>
                <button className="btnNormal m-3"> Aceptar</button>
                <button className="btnNormal" onClick={() => navigate("/")}>
                  {" "}
                  Cancelar
                </button>
              </Col>
              <Col>
                <p>
                  ¿Ya tienes una cuenta?{" "}
                  <Link className="span" to="/Login">
                    Inicia Sesión
                  </Link>{" "}
                </p>
              </Col>
            </form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
