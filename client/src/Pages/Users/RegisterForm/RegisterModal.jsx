import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../../../../public/styles/registerLoginFormStyle.scss";
import { Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const RegisterModal = ({
  showRegisterModal,
  setShowRegisterModal,
  setShowLoginModal,
  openLoginModal,
}) => {
  const closeRegisterModal = () => {
    setShowRegisterModal(false);
    reset()
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      user_name: "",
      user_lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/students/registerStudent", data)
      .then((res) => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
        reset();
      })
      .catch((error) => console.log(error));
  };
  return (
    <Modal
      show={showRegisterModal}
      onHide={closeRegisterModal}
      animation={false}
      size="lg"
      centered
    >
      <Modal.Body className="bckModal">
   
          <div className="formContainer formContainer2">
            <div className="form1">
              <div className="text-group">
                <h1 className="welcome-title">¡Únete a nosotros!</h1>
                <p className="text-paragraph textHidden">
                  Estamos encantados de darte la bienvenida.
                </p>
                <p className="text-paragraph">
                  Regístrate y comienza a ser parte de nuestra comunidad.
                  ¡Esperamos verte pronto!
                </p>
              </div>
            </div>
            <div className="form2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputContainer">
                  <input
                    {...register("user_name", {
                      required: "Campo obligatorio",
                      maxLength: 50,
                    })}
                    id="user_name"
                    placeholder="Nombre"
                    type="text"
                    autoComplete="off"
                    className="forminput"
                    
                  />
                  <label htmlFor="user_name" className="textError">{errors.user_name?.message}</label>
                </div>
                <div className="inputContainer">
                  <input
                    {...register("user_lastname", {
                      required: "Campo obligatorio",
                      maxLength: 1000,
                    })}
                    id="user_lastname"
                    placeholder="Apellidos"
                    type="text"
                    autoComplete="off"
                    className="forminput"
                  />
                  <label htmlFor="user_lastname" className="textError">{errors.user_lastname?.message}</label>
                </div>
                <div className="inputContainer">
                  <input
                    {...register("email", {
                      required: "Campo obligatorio",
                      maxLength: 200,
                    })}
                    id="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="off"
                    className="forminput"
                  />
                  <label htmlFor="email" className="textError">{errors.email?.message}</label>
                </div>
                <div className="inputContainer">
                  <input
                    {...register("password", {
                      required: "Campo obligatorio",
                      /*                   pattern: {
                      value: /^[A-Za-z]+$/i,
                      maxLength: 150,
                      message: "Must contain minus, MAYS,, number and Symbol",
                    }, */
                    })}
                    id="password"
                    placeholder="Contraseña"
                    type="password"
                    autoComplete="off"
                    className="forminput"
                  />
                  <label htmlFor="password" className="textError">{errors.password?.message}</label>
                </div>
                <div className="buttonsCont">
                  <button className="btnNormal me-3"> Aceptar</button>
                  <button className="btnNormal" onClick={closeRegisterModal}>
                    {" "}
                    Cancelar
                  </button>
                </div>
                <p className="mt-2 text-center">
                  ¿Ya tienes una cuenta?{" "}
                  <Link className="span" onClick={openLoginModal}>
                    Inicia Sesión
                  </Link>{" "}
                </p>
              </form>
            </div>
          </div>
      
      </Modal.Body>
    </Modal>
  );
};
export default RegisterModal;
