import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { saveLocalStorageDroneMaster } from "../../../helper/localStorageDroneMaster";
import { DroneMasterContext } from "../../../context/DroneMasterProvider";
import "../../../../public/styles/registerLoginFormStyle.scss";
import { Col, Container, Row } from "react-bootstrap";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, isLogged, setIsLogged, openHome, openRegister } =
    useContext(DroneMasterContext);
  const {
    register,
    handleSubmit,
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
        setUser(res.data.user);
        setIsLogged(true);

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
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="main">
      <Row>
        <Col className="formContainer">
          <div className="form3">
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

              <Col className="d-flex m-3">
                <button className="btnNormal me-3"> Aceptar</button>
                <button className="btnNormal" onClick={openHome}>
                  Cancelar
                </button>
              </Col>
              <Col className="LI">
                <span>¿Aún no formas parte de nuestra comunidad? </span>
                <Link className="span" onClick={openRegister}>
                  Registrate
                </Link>
              </Col>
            </form>
          </div>

          <div className="form4">
            <div className="text-group">
              <h1 className="welcome-title">¡Bienvenido de vuelta!</h1>
              <p className="text-paragraph">
                Estamos emocionados por tenerte aqui nuevamente
              </p>
              <p className="text-paragraph">
                Ingresa y disfruta de tu experiencia
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
