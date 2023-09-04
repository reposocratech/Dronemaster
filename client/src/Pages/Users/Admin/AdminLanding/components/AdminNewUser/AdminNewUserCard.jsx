import React, { useState } from "react";
import FormularioCreacionTeacher from "../FormulariosCreacion/FormularioCreacionUser/FormularioCreacionTeacher";
import { CourseCreationModal } from "../../../../../Courses/components/CourseCreationModal/CourseCreationModal";
import { CategoryCreationModal } from "../FormulariosCreacion/CategoryCreationModal";

const AdminNewUserCard = ({ resEffect, setResEffect }) => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [showCourseCreationModal, setShowCourseCreationModal] = useState(false);
  const [showCategoryCreationModal, setShowCategoryCreationModal] = useState(false)

  const openCreateForm = () => {
    setShowModalForm(true);
  };
  const openCreateCourse = () => {
    setShowCourseCreationModal(true);
  };

  const openCreateCategory = () => {
    setShowCategoryCreationModal(true)
  }

  return (
    <div className="creationButtonsCard">
      <button onClick={openCreateCourse} className="btnOutline1">
        Añadir Curso
      </button>
      <CourseCreationModal
        showCourseCreationModal={showCourseCreationModal}
        setShowCourseCreationModal={setShowCourseCreationModal}
        resEffect={resEffect} setResEffect={setResEffect}
      />
      <button onClick={openCreateForm} className="btnOutline1">
        Añadir Usuario
      </button>
      <FormularioCreacionTeacher
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
      />
      <button onClick={openCreateCategory} className="btnOutline1">
        Añadir Categoría
      </button>
      <CategoryCreationModal
        showCategoryCreationModal={showCategoryCreationModal}
        setShowCategoryCreationModal={setShowCategoryCreationModal}
      />
    </div>
  );
};

export default AdminNewUserCard;
