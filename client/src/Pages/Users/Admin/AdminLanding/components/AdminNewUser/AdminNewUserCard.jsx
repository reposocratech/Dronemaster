import React, { useState } from "react";
import FormularioCreacionTeacher from "../FormulariosCreacion/FormularioCreacionUser/FormularioCreacionTeacher";
import { CourseCreationModal } from "../../../../../Courses/components/CourseCreationModal/CourseCreationModal";

const AdminNewUserCard = () => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [showCourseCreationModal, setShowCourseCreationModal] = useState(false);

  const openCreateForm = () => {
    setShowModalForm(true);
  };
  const openCreateCourse = () => {
    setShowCourseCreationModal(true);
  };

  console.log(showModalForm);

  return (
    <div>
      <button onClick={openCreateForm} className="btnOutline1">
        Añadir Usuario
      </button>

      <FormularioCreacionTeacher
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
      />

      <button onClick={openCreateCourse} className="btnOutline1">
        Añadir Curso
      </button>

      <CourseCreationModal
        showCourseCreationModal={showCourseCreationModal}
        setShowCourseCreationModal={setShowCourseCreationModal}
      />
    </div>
  );
};

export default AdminNewUserCard;
