import React, { useState } from "react";
import FormularioCreacionTeacher from "../FormulariosCreacion/FormularioCreacionUser/FormularioCreacionTeacher";
import { CourseCreationModal } from "../../../../../Courses/components/CourseCreationModal/CourseCreationModal";
import { CategoryCreationModal } from "../FormulariosCreacion/CategoryCreationModal";

const AdminNewUserCard = () => {
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
    <div className="d-flex-column d-xl-flex justify-content-between">
      <button onClick={openCreateCourse} className="btnOutline1">
        Añadir Curso
      </button>
      <CourseCreationModal
        showCourseCreationModal={showCourseCreationModal}
        setShowCourseCreationModal={setShowCourseCreationModal}
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
