import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { saveLocalStorageDroneMaster } from "../../../helper/localStorageDroneMaster";
import { DroneMasterContext } from "../../../context/DroneMasterProvider";
import "../../../../public/styles/registerLoginFormStyle.scss";
import { Col, Container, Row } from "react-bootstrap";
const navigate = useNavigate();
const { setUser, isLogged, openHome, openRegister } =
    useContext(DroneMasterContext);

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
        isLogged(true);
        setUser(res.data.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="main">
      <Row className="formposition">
        <Col className="formContainer">
          <div className="text-group2">
            <form className="position" onSubmit={handleSubmit(onSubmit2)}>
              <input
                {...register("email", {
                  required: "Email must be completed",
                  maxLength: 200,
                })}
                placeholder="Email"
                autoComplete="off"
                type="email"
                className="forminput"
              />

              <p>{errors.email?.message}</p>

              <input
                {...register("password", {
                  required: "Password must be completed",
                })}
                placeholder="Contraseña"
                autoComplete="off"
                type="password"
                className="forminput"
              />

              <p>{errors.password?.message}</p>

              <Col className="d-flex justify-content-center m-3 gap-3">
                <button className="btnNormal "> Aceptar</button>
                <button className="btnNormal" onClick={openHome}>
                  Cancelar
                </button>
              </Col>
              <Col>
                <p className="d-flex flex-column justify-content-center align-content-center mb-2">
                  <span>¿Aún no formas parte de nuestra comunidad? </span>
                  <Link onClick={openRegister} className="span">
                    Registrate
                  </Link>
                </p>
              </Col>
            </form>
          </div>

          <Col className="text-group">
            <div className="welcome-title">¡Bienvenido de vuelta!</div>
            <div className="text-paragraph">
              <p>Estamos emocionados por tenerte aqui nuevamente</p>
              <p>Ingresa y disfruta de tu experiencia</p>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
