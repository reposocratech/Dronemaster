import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { saveLocalStorageDroneMaster } from "../../../helper/localStorageDroneMaster";
import { DroneMasterContext } from "../../../context/DroneMasterProvider";
import "../../../../public/styles/registerLoginFormStyle.scss";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";


const LoginModal = ({ setShowLoginModal, showLoginModal, openRegisterModal }) => {
  
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  const navigate = useNavigate();
  const { setUser, isLogged, setIsLogged, openRegister } =
    useContext(DroneMasterContext);
  const {
    register,
    handleSubmit,
    reset,
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
        reset();
        setShowLoginModal(false);

        const type = res.data.user.type;
        console.log("**********************", res.data.user.type);
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
    <Modal
      className="main lg"
      show={showLoginModal}
      onHide={closeLoginModal}
      animation={false}
    >
      <Modal.Body className="bckModal">
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
                  <button
                    className="btnNormal"
                    onClick={() => {
                      closeLoginModal();
                    }}
                  >
                    Cancelar
                  </button>
                </Col>
                <Col className="LI">
                  <span>¿Aún no formas parte de nuestra comunidad? </span>
                  <span
                    role="button"
                    className="span"
                    onClick={() => {
                      closeLoginModal();
                      openRegisterModal();
                    }}
                  >
                    Registrate
                  </span>
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
      </Modal.Body>
    </Modal>
  );
};
export default LoginModal;
