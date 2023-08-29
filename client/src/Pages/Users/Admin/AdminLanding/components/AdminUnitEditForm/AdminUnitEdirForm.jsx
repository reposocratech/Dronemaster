import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { GiClassicalKnowledge } from "react-icons/gi";
import { useForm } from "react-hook-form";
import axios from "axios";

const AdminUnitEdirForm = ({ unitEditForm, setUnitEditForm }) => {
  const closeUnitEditForm = () => {
    setUnitEditForm(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = () => {};

  return (
    <Modal show={unitEditForm} onHide={closeUnitEditForm}>
      <Modal.Header
        closeButton
        onClick={closeUnitEditForm}
        className="modalHeader"
      >
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Edición de curso</h4>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody1">
          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="course_name" className="ps-3">
              Nombre del Tema
            </label>
            <input
              placeholder="Nombre del Tema"
              {...register("unit_name", {
                required: "Debes rellenar el nombre del tema",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="unit_name"
            />
            <span className="errorMessage">{errors.course_name?.message}</span>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={closeUnitEditForm}>
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

export default AdminUnitEdirForm;
