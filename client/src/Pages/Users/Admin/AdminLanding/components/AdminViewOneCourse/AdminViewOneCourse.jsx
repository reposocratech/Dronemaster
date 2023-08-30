import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminUnitEdirForm from "../AdminUnitEditForm/AdminUnitEdirForm";
import { LessonCreationModal } from "../../../../../Courses/components/CourseCreationModal/LessonCreationModal/LessonCreationModal";
import AdminLessonEditForm from "../AdminLessonEditForm/AdminLessonEditForm";

const AdminViewOneCourse = ({ course_id, resEffect, setResEffect }) => {
  const [allInformation, setAllInformation] = useState();
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const [unitEditForm, setUnitEditForm] = useState(false);
  const [showLessonCreationModal, setShowLessonCreationModal] = useState(false);
  const [unitId, setUnitId] = useState();
  const [lessonId, setLessonId] = useState();
  const [showLessonEditForm, setShowLessonEditForm] = useState(false);

  const OpenLessonCreateModal = (u_id) => {
    setUnitId(u_id);
    setShowLessonCreationModal(true);
  };

  const openLessonEditForm = (l_id) => {
    setUnitId(l_id);
    setShowLessonEditForm(true);
  };

  console.log("allinformatiooooooooooon", allInformation);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setAllInformation(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id, resEffect]);

  const uniqueUnitNames = Array.from(
    new Set(allInformation?.map((item) => item.unit_tittle))
  );
  const unit_id = Array.from(
    new Set(allInformation?.map((item) => item.unit_id))
  );

  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [allInformation]);

  const openUnitEditForm = (u_id) => {
    setUnitId(u_id);
    setUnitEditForm(true);
  };

  //DROPDOWN
  const closedHeight = "0px";
  const openedHeight = "35px";
  const toggleUnit = (unitIndex) => {
    if (openUnits.includes(unitIndex)) {
      // Si el índice ya está en el array, lo eliminamos
      setOpenUnits(openUnits.filter((index) => index !== unitIndex));
    } else {
      // Si el índice no está en el array, lo agregamos
      setOpenUnits([...openUnits, unitIndex]);
    }
  };

  const enableUnit = (unitId) => {
    axios
      .put(`http://localhost:4000/enableUnits/${course_id}/${unitId}`)
      .then((res) => {
        setResEffect(!resEffect);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const disableUnit = (unitId) => {
    axios
      .put(`http://localhost:4000/disableUnits/${course_id}/${unitId}`)
      .then((res) => {
        setResEffect(!resEffect);
        console.log("99999999999999999999999999999999999", unitId);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const enableLesson = (lessonId) => {
    axios
      .put(`http://localhost:4000/enableLessons/${lessonId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => console.log(err));
  };

  const disableLesson = (lessonId) => {
    axios
      .put(`http://localhost:4000/disableLessons/${lessonId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => console.log(err));
  };
  console.log("8888888888888888888888888888888", unitsName);

  return (
    <div>
      {unitsName.map((unitName, unitIndex) => (
        <div key={unitIndex}>
          <div className="d-flex me-4">
            <h6>
              Tema {unitIndex + 1}: {unitName}
            </h6>
            <div>
              <BsPlusCircleFill
                className="icon"
                onClick={() => OpenLessonCreateModal(unit_id[unitIndex])}
              />
              <span onClick={() => openUnitEditForm(unit_id[unitIndex])}>
                <BsPencil />{" "}
              </span>
              {allInformation
                .filter((item) => item.unit_tittle === unitName)
                .every((item) => !item.unit_is_hidden) ? (
                <BsEye onClick={() => disableUnit(unit_id[unitIndex])} />
              ) : (
                <BsEyeSlash onClick={() => enableUnit(unit_id[unitIndex])} />

              )}
            </div>
          </div>

          <div
            className="dropdownContainer"
            onClick={() => toggleUnit(unitIndex)}
          >
            {openUnits.includes(unitIndex) ? (
              <IoMdArrowDropup />
            ) : (
              <IoMdArrowDropdown />
            )}
          </div>
          <div>
            {allInformation
              .filter((item) => item.unit_tittle === unitName)
              .map((lesson) => (
                <div className="listedLesson">
                  <div className="lessonText">
                    <h6 className="lessonText">{lesson.lesson_title}</h6>
                  </div>
                  <div>
                    <span onClick={() => openLessonEditForm(lesson.lesson_id)}>
                      <BsPencil />
                    </span>
                    {lesson?.lesson_is_hidden === 1 ? (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          enableLesson(lesson?.lesson_id);
                        }}
                      >
                        <BsEye />
                      </span>
                    ) : (
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          disableLesson(lesson?.lesson_id);
                        }}
                      >
                        <BsEyeSlash />
                      </span>
                    )}{" "}
                    <AdminLessonEditForm
                      showLessonEditForm={showLessonEditForm}
                      setShowLessonEditForm={setShowLessonEditForm}
                      lesson={lesson}
                      unit_id={unitId}
                      course_id={course_id}
                      resEffect={resEffect}
                      setResEffect={setResEffect}
                    />
                  </div>
                </div>
              ))}
            <div>
              {allInformation
                .filter((item) => item.unit_tittle === unitName)
                .map((resource) => (
                  <div className="mb-4">
                    <div> Recurso: {resource.resource_id}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      <LessonCreationModal
        setShowLessonCreationModal={setShowLessonCreationModal}
        showLessonCreationModal={showLessonCreationModal}
        course_id={course_id}
        resEffect={resEffect}
        setResEffect={setResEffect}
        unitId={unitId}
      />

      <AdminUnitEdirForm
        unitEditForm={unitEditForm}
        setUnitEditForm={setUnitEditForm}
        unit_id={unitId}
        course_id={course_id}
        resEffect={resEffect}
        setResEffect={setResEffect}
      />
    </div>
  );
};
export default AdminViewOneCourse;
