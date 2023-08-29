import React, { useContext, useEffect, useState } from "react";
import { Modal,  } from "react-bootstrap";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiClassicalKnowledge } from "react-icons/gi";
import { PiTrashBold } from "react-icons/pi";

import "./courseEditionModalStyle.scss";

export const CourseEditionModal = ({
  setShowCourseEditionModal,
  showCourseEditionModal,
  //   course_id,
}) => {
  const [teachersList, setTeachersList] = useState();
  const [categoriesList, setCategoriesList] = useState();
  const [tag, setTag] = useState();
  const [tagsList, setTagsList] = useState([]);
  const [courseData, setCourseData] = useState();
  const [courseImg, setCourseImg] = useState();
  const [file, setFile] = useState();
  const [teacherPrev_id, setTeacherPrev_id] = useState();


  const { user, resetData, setResetData } = useContext(DroneMasterContext);

  const course_id = 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    axios

      .get(`http://localhost:4000/courses/courseInfoEdition/${course_id}`)
      .then((res) => {
        setCourseData(res.data[0]);
        setTeacherPrev_id(res.data[0].teacher_id);
        setCourseImg(
          `http://localhost:4000/images/courses/${res.data[0].course_img}`
        );
      })
      .catch((error) => console.log(error));
  }, [courseImg, course_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/courseTags/${course_id}`)
      .then((res) => {
        setTagsList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/allTeachers`)
      .then((res) => {
        setTeachersList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/allCategories`)
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClose = () => {
    setShowCourseEditionModal(false);
  };

  const handleTagsChange = (e) => {
    setTag(e.target.value);
  };

  const handleTagButton = () => {
    setTagsList([...tagsList, { tag_name: tag }]);
    setTag("");
  };

  const onSubmit = (data) => {
    axios
      .put(
        `http://localhost:4000/courses/editCourse/${course_id}/${teacherPrev_id}`,
        {
          data,
          tagsList,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });


    if (file) {
      const newFormData = new FormData();

      newFormData.append("file", file);

      axios
        .put(
          `http://localhost:4000/courses/uploadCourseImage/${course_id}`,
          newFormData
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
  };
  console.log(courseData);

  useEffect(() => {    
     courseData?.course_name && setValue("course_name", courseData.course_name || "");
     courseData?.course_length && setValue("course_length", courseData.course_length || "");
     courseData?.price && setValue("price", courseData.price || "");
     courseData?.category_id && setValue("category_id", courseData.category_id || "");
     courseData?.teacher_id && setValue("teacher_id", courseData.teacher_id || "");
     courseData?.start_date && courseData.start_date != null && setValue("start_date", courseData.start_date.slice(0, 10) || "");
  }, [courseData, setValue]);
  console.log(courseData?.start_date);

  const handleDeleteTag = (tagId, tagName) => {
    let url = "";
    if (tagId != undefined) {
      axios
        .put(
          `http://localhost:4000/admin/deleteCourseTag/${tagId}/${course_id}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const updatedTagsList = tagsList.filter((tag) => tag.tag_name !== tagName);
    setTagsList(updatedTagsList);
  };

  return (
    <Modal
      show={showCourseEditionModal ? setShowCourseEditionModal : true}
      onHide={handleClose}
      centered={true}
      size="xl"
      fullscreen="false"
      className="courseEditionModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Edición de curso</h4>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody">
          {/* Image Container */}

          <div className="imgContainer">
            {courseData && <img src={courseImg} alt="" />}
          </div>

          {/* Image Input Group */}
          <div className="inputFileContainer">
            <input
              name="file"
              type="file"
              onChange={handleImgChange}
              className="inputFile"
              id="inputFile"
            />
            <label htmlFor="inputFile" className="inputImageLabel btnNormal">
              Selecciona Imagen
            </label>
          </div>

          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="course_name" className="ps-3">
              Nombre del curso
            </label>
            <input
              placeholder="Nombre del Curso"
              {...register("course_name", {
                required: "Debes rellenar el nombre del curso",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="course_name"
            />
            <span className="errorMessage">{errors.course_name?.message}</span>
          </div>

          {/* Category Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputCategory">
            <label htmlFor="category_id" className="ps-3">
              Categoría
            </label>
            <select
              {...register("category_id")}
              id="category_id"
              className="input2"
              autoComplete="fañse"
            >
              <option value={1} className="optionDefault">
                Seleccione una categoria{" "}
              </option>
              {categoriesList?.map((category) => {
                return (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                );
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
              {...register("course_length", {
                required: "Debes rellenar este campo",
              })}
              id="course_length"
              className="input1"
              type="number"
            />
            <span className="errorMessage">
              {errors.course_length?.message}
            </span>
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
              {teachersList?.map((teacher) => {
                return (
                  <option key={teacher.user_id} value={teacher.user_id}>
                    {teacher.user_name}
                  </option>
                );
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
              placeholder="Precio"
              {...register("price", {
                required: "Valor erroneo",
                maxLength: { value: 8, message: "Maximo 99999'99 €" },
              })}
              id="price"
              className="input1"
            />
            <span className="errorMessage">{errors.price?.message}</span>
          </div>

          {/* Date Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputDate">
            <label htmlFor="start_date" className="ps-3">
              Fecha de inicio
            </label>
            <input
              type="date"
              placeholder="Fecha de inicio"
              {...register("start_date")}
              id="start_date"
              className="input1"
            />
          </div>

          {/* Tags Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputTags">
            <label htmlFor="tag" className="ps-3">
              #Tags
            </label>
            <div className="d-flex w-100">
              <input
                value={tag}
                placeholder="#Tags"
                name="tag"
                id="tag"
                className="input1"
                onChange={handleTagsChange}
              />
              <span
                className="btnOutline1 addTagButton"
                onClick={handleTagButton}
              >
                Añadir
              </span>
            </div>
          </div>

          <div className="d-flex flex-column align-items-start gap-1 tagsList">
            <div className="tagListContainer d-flex flex-wrap ">
              {tagsList?.map((tag, index) => {
                return (
                  <p key={index} className="m-0 me-3 ">
                    <MdOutlineDeleteOutline
                      className="deleteIcon"
                      onClick={() => handleDeleteTag(tag.tag_id, tag.tag_name)}
                    />
                    #{tag.tag_name}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Description Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputDescription">
            <label htmlFor="course_description" className="ps-3">
              Descripción
            </label>

            <textarea
              placeholder="Descripcíon"
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
