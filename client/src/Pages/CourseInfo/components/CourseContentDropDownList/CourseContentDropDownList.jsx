import React, { useEffect, useState } from "react";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const CourseContentDropDownList = ({
  myCourseInfo,
  user,
  unitsCount,
  lessonsCount,
  course_id,
}) => {
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
  console.log(myCourseInfo);
  return (
    <div className="allUnitsLessonCard">
      <div className="listContainer">
        <div className="listHeadline">
          <h5 className="mb-1">Contenido del curso</h5>
          <div className="d-flex gap-2">
            <div className="d-flex align-items-center gap-1 ">
              <AiOutlineFolderOpen className="icon" />
              <h6>{unitsCount} Temas</h6>
            </div>
            <span className="align-self-center"> / </span>{" "}
            <div className="d-flex align-items-center  gap-1">
              <MdOutlinePlayLesson className="icon2" />{" "}
              <h6>{lessonsCount} Lecciones</h6>
            </div>
          </div>
        </div>
        {unitsName.map((unitName, unitIndex) => {
          const filteredLessons = myCourseInfo.filter(
            (item) => item.unit_tittle === unitName && item.lesson_id !== null
          );

          return (
            <div key={unitIndex} className="unitList">
              <div className="unitTitle">
                <h6>
                  <AiOutlineFolderOpen className="icon2 me-2" />
                  {unitIndex + 1}. {unitName}
                </h6>
                {filteredLessons.length > 0 && (
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
                )}
              </div>
              <ol>
                {filteredLessons.map((lesson) => (
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
                      <div className="lessonText">
                        <MdOutlinePlayLesson className="icon3" />{" "}
                        {lesson.lesson_title}
                      </div>
                      {user && (
                        <button
                          className="openLessonButton"
                          onClick={() =>
                            navigate(
                              `/courses/courseInfo/lessonInfo/${course_id}/${lesson.unit_id}/${lesson.lesson_id}`
                            )
                          }
                        >
                          Abrir
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
};
