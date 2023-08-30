import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminUnitEdirForm from "../AdminUnitEditForm/AdminUnitEdirForm";
import { LessonCreationModal } from "../../../../../Courses/components/CourseCreationModal/LessonCreationModal/LessonCreationModal";
import {
  BsFillFileEarmarkArrowDownFill,
  BsFillFileArrowUpFill,
  BsFillFileEarmarkExcelFill,
  BsFillEyeFill,
} from "react-icons/bs";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { Navigate, useNavigate } from "react-router-dom";

const AdminViewOneCourse = ({ course_id, resEffect, setResEffect }) => {
  const navigate = useNavigate()
  const { user } = useContext(DroneMasterContext)
  const [allInformation, setAllInformation] = useState();
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const [unitEditForm, setUnitEditForm] = useState(false);
  const [showLessonCreationModal, setShowLessonCreationModal] = useState(false);
  const [unitId, setUnitId] = useState();

  const enableResource = (resource_id) => {
    axios
      .put(`http://localhost:4000/enableResource/${resource_id}`)
      .then((res) => setResEffect(!resEffect))
      .catch((err) => console.log(err));
  };

  const disableResource = (resource_id) => {
    axios
      .put(`http://localhost:4000/disableResource/${resource_id}`)
      .then((res) => setResEffect(!resEffect))
      .catch((err) => console.log(err));
  };

  const OpenLessonCreateModal = (u_id) => {
    setUnitId(u_id);
    setShowLessonCreationModal(true);
  };

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

  const openUnitEditForm = () => {
    setUnitEditForm(true);
  };

  console.log("alll", allInformation);

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

  const downloadResource = (resource_id) => {
    console.log(resource_id);

    axios
      .get(`http://localhost:4000/resourceName/${resource_id}`)
      .then((res) => {
        saveAs(
          `http://localhost:4000/images/resources/${res.data[0].resource_name}`,
          `${res.data[0].resource_name}`
        )
        setResEffect(!resEffect)
      }
      )
      .catch((err) => console.log(err));
  };

  const uploadResource = (e, lesson_id, unit_id) => {
    const newFormData = new FormData();
    newFormData.append("file", e.target.files[0]);

    axios
      .post(
        `http://localhost:4000/uploadResource/${user.user_id}/${course_id}/${unit_id}/${lesson_id}`,
        newFormData
      )
      .then((res) => setResEffect(!resEffect))
      .catch((err) => console.log(err));
  };

  const enableUnit = (unitId, isHidden) => {
    axios
      .put(`http://localhost:4000/disableUnit/${unitId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const disableUnit = (unitId, isHidden) => {
    axios
      .put(`http://localhost:4000/disableUnit/${unitId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteResource = (lesson_id, resource_id) => {
    console.log(lesson_id);
    axios
      .delete(
        `http://localhost:4000/admin/deleteResource/${resource_id}/${lesson_id}`
      )
      .then((res) => setResEffect(!resEffect))
      .catch((err) => console.log(err));
  };

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
              <BsPencil onClick={openUnitEditForm} />
              {allInformation
                .filter((item) => item.unit_tittle === unitName)
                .every((item) => !item.unit_is_hidden) ? (
                <BsEyeSlash onClick={() => enableUnit(unitIndex)} />
              ) : (
                <BsEye onClick={() => disableUnit(unitIndex)} />
              )}
            </div>
          </div>
          <AdminUnitEdirForm
            unitEditForm={unitEditForm}
            setUnitEditForm={setUnitEditForm}
          />
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
                    <BsPencil />
                    <BsEyeSlash />
                    <BsEye />
                    <button className="btnOutline1" onClick={() => { navigate(`/courses/courseInfo/lessonInfo/${course_id}/${lesson.unit_id}/${lesson.lesson_id}`) }}>Ver más</button>
                  </div>
                  {console.log("asas", lesson.resource_id)}
                </div>
              ))}
            <div>
              {allInformation
                .filter((item) => item.unit_tittle === unitName)
                .map((resource) => (
                  <div className="mb-4">
                    <div> Recurso: {resource.resource_id}</div>
                    {(resource.resource_id && resource?.resource_is_hidden === 1) && (
                      <BsFillEyeFill
                        className="deleteIcon text-danger"
                        onClick={() => enableResource(resource.resource_id)}
                      />
                    )}
                    {(resource.resource_id && resource?.resource_is_hidden === 0) && (
                      <BsFillEyeFill
                        className="downloadIcon text-success"
                        onClick={() => disableResource(resource.resource_id)}
                      />
                    )}
                    {(resource.resource_id && resource?.resource_is_hidden === 0) && <BsFillFileEarmarkArrowDownFill
                      className="downloadIcon text-success"
                      onClick={() => downloadResource(resource.resource_id)}
                    />}
                    {!resource.resource_id && <>
                      <label htmlFor={resource.lesson_id} className="d-inline">
                        <BsFillFileArrowUpFill className="uploadIcon" />
                      </label>
                      <input
                        type="file"
                        onChange={(e) => uploadResource(e, resource.lesson_id, resource.unit_id)
                        }
                        className="d-none"
                        id={resource.lesson_id}
                      />
                    </>}
                    {resource.resource_id && resource?.resource_is_hidden === 0 && (
                      <BsFillFileEarmarkExcelFill
                        className="deleteIcon"
                        onClick={() => deleteResource(resource.lesson_id, resource.resource_id)}
                      />
                    )}
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
    </div>
  );
};
export default AdminViewOneCourse;
