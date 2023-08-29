import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, ModalFooter, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DroneMasterContext } from "../../../../../../../context/DroneMasterProvider";
import { useForm } from "react-hook-form";
/* import "./FormularionCreacionUser.scss"; */
import { GiClassicalKnowledge } from "react-icons/gi";
import axios from "axios";

const FormularioCreacionTeacher = ({ showModalForm, setShowModalForm }) => {
  const { course } = useContext(DroneMasterContext);
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
  const handleClose = () => setShowModalForm(false);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:4000/admin/createUser", data)
      .then((res) => {
        console.log("result.data.user/////////////", res);
        showModalForm(false);
        reset();
      })
      .catch((error) => console.log(error));
    setShowModalForm(false);
  };

  return (
    <Modal
      show={showModalForm}
      onHide={handleClose}
      centered={true}
      fullscreen="false"
      className="courseCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Creacion de un nuevo Usuario</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody1">
          <Row>
            <Col>
              <input
                {...register("user_name", {
                  required: "Campo obligatorio",
                  maxLength: 50,
                })}
                placeholder="Nombre"
                type="text"
                autoComplete="off"
                className="input2"
              />
              <p>{errors.firstName?.message}</p>
              <input
                {...register("user_lastname", {
                  /* required: "Campo obligatorio", */
                  maxLength: 1000,
                })}
                placeholder="Apellidos"
                type="text"
                autoComplete="off"
                className="input2"
              />
              <p>{errors.lastName?.message}</p>
              <input
                {...register("email", {
                  /* required: "Campo obligatorio", */
                  maxLength: 200,
                })}
                placeholder="Email"
                type="email"
                autoComplete="off"
                className="input2"
              />
              <p>{errors.email?.message}</p>
              <input
                {...register("password", {
                  /* required: "Campo obligatorio", */
                  /*                   pattern: {
                    value: /^[A-Za-z]+$/i,
                    maxLength: 150,
                    message: "Must contain minus, MAYS,, number and Symbol",
                  }, */
                })}
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
                className="input2"
              />
              <div>
                <label htmlFor="type" className="ps-3">
                  Tipo de Usuario
                </label>
                <select
                  placeholder="Tipo de Usuario"
                  {...register("type")}
                  id="type"
                  className="input2"
                >
                  <option value={0}> Alumno </option>
                  <option value={1}> Profesor </option>
                  <option value={2}> Administrador </option>
                </select>
              </div>
              <p>{errors.password?.message}</p>

              {/*   <div className="d-flex m-3">
                <button className="btnNormal me-4"> Enviar</button>
                <button className=" btnOutline1" onClick={closeCreateForm}>
                  {" "}
                  Cancelar
                </button>
              </div> */}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className="btnOutline1" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btnNormal" type="submit">
            Enviar
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormularioCreacionTeacher;
