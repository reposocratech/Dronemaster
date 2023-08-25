import React, {useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

import { GiClassicalKnowledge } from "react-icons/gi";
import "./courseCreationModal.scss";

export const CourseCreationModal = ({
  setShowCourseCreationModal,
  showCourseCreationModal,
}) => {
  const [teachersList, setTeachersList] = useState()
  const [categoriesList, setCategoriesList] = useState()
  const { register, handleSubmit } = useForm();
  const { user_id } = useParams();
  const [tagsList, setTagsList] = useState()
  

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/allTeachers`)
      .then((res) => {
        console.log(res.data)
        setTeachersList(res.data)
      })
      .catch((err) => console.log(err))

  }, [])
  
  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/allCategories`)
      .then((res) => {
        console.log(res.data)
        setCategoriesList(res.data)
      })
      .catch((err) => console.log(err))

  }, [])


  const handleClose = () => {
    setShowCourseCreationModal(false);
  };

  const handleTagsChange = (e) => {
    
  }

  const onSubmit = () => {};

  return (
    <Modal
      show={true}
      onHide={handleClose}
      centered={true}
      size="xl"
      className="courseCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Creacion de un nuevo curso</h4>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody">
          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="course_name" className="ps-3">
              Nombre del curso
            </label>
            <input
              placeholder="Nombre del Curso"
              {...register("course_name")}
              className="input1"
              id="course_name"
            />
          </div>

          {/* Category Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputCategory">
            <label htmlFor="category_id" className="ps-3">
              Categoria
            </label>
            <select
              {...register("category_id")}
              id="category_id"
              className="input2"
              autoComplete="fañse"
            >
              <option value={1} className="optionDefault">Seleccione una categoria </option>
            {categoriesList?.map((category) => {
              return(
                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
              )
            })}
            </select>
            
          </div>

          {/* Length Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputLength">
            <label htmlFor="course_length" className="ps-3">
              Duracion estimada (h)
            </label>
            <input
              placeholder="Duración estimada"
              {...register("course_length")}
              id="course_length"
              className="input1"
              type="number"
            />
          </div>

          {/* Teacher Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputTeacher">
            <label htmlFor="teacher_id" className="ps-3">
              Profesor
            </label>
            <select
              placeholder="Profesor del curso"
              {...register("teacher_id")}
              id="teacher_id"
              className="input2"
            >
                 <option value={user_id} > Seleccione un profesor </option>
            {teachersList?.map((teacher) => {
              return(
                <option key={teacher.user_id} value={teacher.user_id}>{teacher.user_name}</option>
              )
            })}
            </select>
          </div>

          {/* Price Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputPrice">
            <label htmlFor="price" className="ps-3">
              Precio (€)
            </label>
            <input
            type="number"
              placeholder="Precio "
              {...register("price")}
              id="price"
              className="input1"
            />
          </div>

          {/* Tags Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputTags">
            <label htmlFor="tag" className="ps-3">
              #Tags
            </label>
            <div className="d-flex w-100">
              <input placeholder="#Tags" name="tag" id="tag" className="input1" onChange={handleTagsChange} />
              <button className="btnOutline1 addTagButton">Añadir</button>
            </div>
          </div>


          <div className="d-flex flex-column align-items-start gap-1 tagsList"> <div className="input4"></div></div>

          {/* Description Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputDescription">
            <label htmlFor="course_description" className="ps-3">
              Descripción
            </label>

            <textarea
              placeholder="#Descripcíon"
              {...register("course_description")}
              id="course_description"
              className="input3"
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
  );
};
