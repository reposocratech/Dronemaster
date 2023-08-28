import React, { useContext, useState } from 'react'
import { Modal } from "react-bootstrap";
import { AiFillPhone } from "react-icons/ai"
import { useForm } from "react-hook-form"
import './formMailModal.scss'

export const FormMailModal = ({ showMailModal, setShowMailModal }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleClose = () => {
        setShowMailModal(false)
    }

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/infoEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            reset()
            setShowMailModal(false)
        } catch (error) {
            console.error(error);
        }
    }

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
                    <h4 className="titleText">Contáctanos y te llamamos</h4>
                </div>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body className="modalBodyMail">
                    <p className='question text-center'>¿Tienes alguna duda, o quieres recibir información? deja tu nombre y el numero de telefono y te llamamos</p>
                    <div className="d-flex flex-column align-items-start gap-1 inputName">
                        <label htmlFor="user_name" className="ps-3">
                            Nombre
                        </label>
                        <input
                            placeholder="Nombre"
                            {...register("user_name")}
                            className="input1"
                            id="user_name"
                        />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 inputPhone">
                        <label htmlFor="phone" className="ps-3">
                            Teléfono
                        </label>
                        <input
                            placeholder="Teléfono"
                            {...register("phone")}
                            id="phone"
                            className="input1"
                        />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 inputEmail">
                        <label htmlFor="email" className="ps-3">
                            Email
                        </label>
                        <input
                            placeholder="Email"
                            {...register("email", {
                                required: "Email must be completed",
                                maxLength: 200,
                            })}
                            id="email"
                            className="input1"
                        />
                    </div>
                    <div className="d-flex flex-column align-items-start gap-1 inputDescription">
                        <label htmlFor="description" className="ps-3">
                            descripción
                        </label>
                        <input
                            placeholder="Cuéntanos que necesitas"
                            {...register("description", {
                                required: "description must be completed",
                                maxLength: 200,
                            })}
                            id="description"
                            className="input1"
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer className="modalFooter">
                    <button className=" btnOutline1" onClick={handleClose}>
                        Cancelar
                    </button>
                    <button className="btnNormal" type="submit">
                        Enviar
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
