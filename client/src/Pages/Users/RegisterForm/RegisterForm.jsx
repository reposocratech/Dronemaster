import React, { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../../../public/styles/registerLoginFormStyle.scss";
import { Container, Row, Col } from "react-bootstrap";
import { DroneMasterContext } from "../../../context/DroneMasterProvider";
import { saveLocalStorageDroneMaster } from "../../../helper/localStorageDroneMaster";

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
  const { setUser, isLogged, openHome, openLogin } =
    useContext(DroneMasterContext);

  const onSubmit = (data) => {
    axios

      .post("http://localhost:4000/students/registerStudent", data)
      .then((res) => {
        console.log("result.data.user/////////////", res);
        saveLocalStorageDroneMaster("token", res.data.token);
        navigate("/student");
        isLogged(true);
        setUser(res.data.user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid className="main">
      <Row>
        <Col className="formContainer">
          <div className="form1">
            <div className="text-group">
              <h1 className="welcome-title">¡Únete a nosotros!</h1>
              <p className="text-paragraph">
                Estamos encantados de darte la bienvenida.
              </p>
              <p className="text-paragraph">
                Regístrate y comienza a ser parte de nuestra comunidad.
                ¡Esperamos verte pronto!
              </p>
            </div>
          </div>
          <Col className="form2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("user_name", {
                  required: "Must be completed",
                  maxLength: 50,
                })}
                placeholder="Nombre"
                type="text"
                autoComplete="off"
                className="forminput"
              />
              <p>{errors.firstName?.message}</p>

              <input
                {...register("user_lastname", {
                  required: "Must be completed",
                  maxLength: 1000,
                })}
                placeholder="Apellidos"
                type="text"
                autoComplete="off"
                className="forminput"
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
                className="forminput"
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
                className="forminput"
              />
              <p>{errors.password?.message}</p>

              <div className="d-flex m-3">
                <button className="btnNormal me-3"> Aceptar</button>
                <button className="btnNormal" Click={openHome}>
                  {" "}
                  Cancelar
                </button>
              </div>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link className="span" onClick={openLogin}>
                  Inicia Sesión
                </Link>{" "}
              </p>
            </form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
