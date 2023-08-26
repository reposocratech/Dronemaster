import React, { useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {
  BsFillFileEarmarkArrowDownFill,
  BsFillFileArrowUpFill,
  BsFillFileEarmarkExcelFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const TeacherOnecourseContent = ({ myCourseInfo }) => {
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const navigate = useNavigate();

  // Takes uniques unit_title
  const uniqueUnitNames = Array.from(
    new Set(myCourseInfo?.map((item) => item.unit_tittle))
  );

  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [myCourseInfo]);

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
                        <BsFillFileEarmarkArrowDownFill className="downloadIcon" />
                        <BsFillFileArrowUpFill className="uploadIcon" />
                        <BsFillFileEarmarkExcelFill className="deleteIcon" />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
