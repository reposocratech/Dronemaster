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
      <Row className="formContainer">
        <Col className="form1 col-4">
          <h1>¡Únete a nosotros!</h1>
          <p>Estamos encantados de darte la bienvenida.</p>
          <p>
            Regístrate y comienza a ser parte de nuestra comunidad. ¡Esperamos
            verte pronto!
          </p>
          <Col className="form2 col-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("user_name", {
                  required: "Must be completed",
                  maxLength: 50,
                })}
                placeholder="Nombre"
                type="text"
                className="input-user"
                autoComplete="off"
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

              <div>
                <button> Aceptar</button>
                <button Click={openHome}> Cancelar</button>
              </div>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link onClick={openLogin}>Inicia Sesión</Link>{" "}
              </p>
            </form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
