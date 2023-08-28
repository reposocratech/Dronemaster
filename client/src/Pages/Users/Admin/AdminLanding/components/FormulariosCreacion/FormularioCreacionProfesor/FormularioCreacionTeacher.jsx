import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { DroneMasterContext } from "../../../../../../../context/DroneMasterProvider";
import { useForm } from "react-hook-form";

const FormularioCreacionTeacher = (
  showModalForm,
  setShowModalForm,
  openCreateForm,
  closeCreateForm
) => {
  const { user } = useContext(DroneMasterContext);
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
      .post("http://localhost:4000/admin/createUser", data)
      .then((res) => {
        console.log("result.data.user/////////////", res);
        setShowLoginModal(true);
        setShowRegisterModal(false);
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Modal show={showModalForm} onHide={closeCreateForm}>
      <Modal.Header closeButton>
        <Modal.Title>Create new User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("user_name", {
                  required: "Must be completed",
                  maxLength: 50,
                })}
                placeholder="Nombre"
                type="text"
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
              />

              <label htmlFor="user_id" className="ps-3">
                Tipo de Usuario
              </label>
              <select
                placeholder="Tipo de Usuario"
                {...register("user_id")}
                id="user_id"
                className="input2"
              >
                {/*                 <option value={user?.user_id}> Seleccione un profesor </option>
                {teachersList?.map((type) => {
                  return (
                    <option key={type.user_id} value={type.user_id}>
                      {type.user_name}
                    </option>
                  );
                })} */}
              </select>

              <p>{errors.password?.message}</p>
              <div className="d-flex m-3">
                <button> Aceptar</button>
                <button onClick={closeCreateForm}> Cancelar</button>
              </div>
            </form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioCreacionTeacher;
