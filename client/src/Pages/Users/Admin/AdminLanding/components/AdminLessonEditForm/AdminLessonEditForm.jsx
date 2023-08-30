import axios from "axios";
import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { GiClassicalKnowledge } from "react-icons/gi";

const AdminLessonEditForm = ({
  showLessonEditForm,
  setShowLessonEditForm,
  lesson,
  resEffect,
  setResEffect,
  unit_id,
  course_id,
}) => {
  const closeLessonEditForm = () => {
    setShowLessonEditForm(false);
    setResEffect(!resEffect);
  };
  const [editLesson, setEditLesson] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .put(
        `http://localhost:4000/admin/editLesson/${course_id}/${unit_id}/${lesson.lesson_id}`,
        data
      )

      .then((res) => {
        console.log(res);
        setEditLesson(res.data);
        closeLessonEditForm(true);
        setResEffect(!resEffect);
      })

      .catch((err) => console.log(err));
  };

  return (
    <Modal show={showLessonEditForm} onHide={closeLessonEditForm}>
      <Modal.Header
        closeButton
        onClick={closeLessonEditForm}
        className="modalHeader"
      >
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Edición de la lección</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody1">
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="lesson_title" className="ps-3">
              Nombre del la lección
            </label>
            <input
              placeholder="Nombre de la lección"
              {...register("lesson_title", {
                required: "Campo obligatorio",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="lesson_title"
            />
            <span className="errorMessage">{errors.lesson_title?.message}</span>
          </div>
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="lesson_content" className="ps-3">
              Descripción de la Lección
            </label>
            <textarea
              placeholder="Descripción"
              {...register("lesson_content", {
                required: "Campo Obligatorio",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 250, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="lesson_content"
            />
            <span className="errorMessage">
              {errors.lesson_content?.message}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={closeLessonEditForm}>
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

export default AdminLessonEditForm;
