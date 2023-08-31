import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { AiFillPhone } from "react-icons/ai";
import { useForm } from "react-hook-form";
import "./formMailModal.scss";

export const FormMailModal = ({ showMailModal, setShowMailModal }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleClose = () => {
    setShowMailModal(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/infoEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      reset();
      setShowMailModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      show={showMailModal}
      onHide={handleClose}
      centered={true}
      size="md"
      className="editionModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <AiFillPhone />
          </div>
          <h4 className="titleText">Contáctanos</h4>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBodyMail">
        <div className="inputName">
          <p className="question text-center">
            ¿Tienes alguna duda, o quieres recibir información? llámanos o escríbenos un correo
          </p>
          <h6>Teléfono de contacto: <span className="fst-italic" >676767676</span></h6>
          <h6>Correo electrónico: <span className="fst-italic" >dronemasterinfo@gmail.com</span></h6>
        </div>
      </Modal.Body>
    </Modal>
  );
};
