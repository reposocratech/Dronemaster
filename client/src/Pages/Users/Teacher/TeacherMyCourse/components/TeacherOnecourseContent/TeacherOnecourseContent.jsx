import React, { useContext, useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {
  BsFillFileEarmarkArrowDownFill,
  BsFillFileArrowUpFill,
  BsFillFileEarmarkExcelFill,
  BsFillEyeFill
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";


export const TeacherOnecourseContent = ({ myCourseInfo }) => {
  const { course_id } = useParams()
  const { user } = useContext(DroneMasterContext)
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const navigate = useNavigate();
  const [resetUseEffect, setResetUseEffect] = useState(false)
  const [file, setFile] = useState();


  console.log(myCourseInfo);

  // Takes uniques unit_title
  const uniqueUnitNames = Array.from(
    new Set(myCourseInfo?.map((item) => item.unit_tittle))
  );

  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [myCourseInfo]);

  const closedHeight = "0px";
  const openedHeight = "35px";

  const uploadResource = (e, lesson_id, unit_id) => {

    const newFormData = new FormData()

    newFormData.append("file", e.target.files[0])
    axios
      .post(`http://localhost:4000/uploadResource/${user.user_id}/${course_id}/${unit_id}/${lesson_id}`, newFormData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

  }

  console.log("eoeoeo", file);

  const toggleUnit = (unitIndex) => {
    if (openUnits.includes(unitIndex)) {
      // Si el índice ya está en el array, lo eliminamos
      setOpenUnits(openUnits.filter((index) => index !== unitIndex));
    } else {
      // Si el índice no está en el array, lo agregamos
      setOpenUnits([...openUnits, unitIndex]);
    }
  };

  const enableLesson = (lesson_id) => {
    axios
      .put(`http://localhost:4000/enableLessons/${lesson_id}`)
      .then((res) => { })
      .catch((err) => console.log(err))
  }

  const disableLesson = (lesson_id) => {
    axios
      .put(`http://localhost:4000/disableLessons/${lesson_id}`)
      .then((res) => setResetUseEffect(!resetUseEffect))
      .catch((err) => console.log(err))

  }

  const downloadResource = (lesson_id) => {
    axios
      .get(`http://localhost:4000/resourceName/${lesson_id}`)
      .then((res) => saveAs(`http://localhost:4000/images/resources/${res.data[0].resource_name}`, `${res.data[0].resource_name}`))
      .catch((err) => console.log(err))
  }


  const deleteResource = (resource_id) => {
    axios
      .delete(`http://localhost:4000/teachers/deleteResource/${user.user_id}/${resource_id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="allUnitsLessonCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>
          <h5 className="titleText">
            {[myCourseInfo && myCourseInfo[0].course_name]}
          </h5>
        </div>
        <button
          className="btnOutline1"
          onClick={() =>
            navigate(`/courses/courseInfo/${myCourseInfo[0].course_id}`)
          }
        >
          Ver más
        </button>
      </div>

      <div className="listContainer">
        <div className="listHeadline">
          <h6>Unidades</h6>
          <h6>Recursos</h6>
        </div>
        {unitsName.map((unitName, unitIndex) => (
          <div key={unitIndex} className="unitList">
            <div className="unitTitle">
              <h6>{unitName}</h6>
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
            </div>
            <ul>
              {myCourseInfo
                .filter((item) => item.unit_tittle === unitName)
                .map((lesson) => (
                  <li
                    key={lesson.lesson_id}
                    className="listedLesson"
                    style={{
                      height: openUnits.includes(unitIndex)
                        ? openedHeight
                        : closedHeight,
                      transition: "height 0.75s ease-in-out",
                    }}
                  >
                    <div className="lessonTitle">
                      <div className="lessonText">{lesson.lesson_title}</div>
                      <div className="resourceContainer">
                        {lesson?.lesson_is_hidden === 1 && <BsFillEyeFill className="deleteIcon" onClick={() => enableLesson(lesson.lesson_id)} />}
                        {lesson?.lesson_is_hidden === 0 && <BsFillEyeFill className="downloadIcon"
                          onClick={() => disableLesson(lesson.lesson_id)} />}
                        <BsFillFileEarmarkArrowDownFill
                          className="downloadIcon"
                          onClick={() => downloadResource(lesson.lesson_id)}
                        />

                        <label htmlFor="inputFile" className="d-inline"><BsFillFileArrowUpFill className="uploadIcon"
                        /></label>
                        <input
                          type="file"
                          onChange={(e) => uploadResource(e, lesson.lesson_id, lesson.unit_id)}
                          className="d-none"
                          id="inputFile"
                        />

                        <BsFillFileEarmarkExcelFill className="deleteIcon"
                          onClick={() => deleteResource(lesson.resource_id)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div >
  );
};
