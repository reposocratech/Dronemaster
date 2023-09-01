import React, { useContext, useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { BiRightArrowAlt } from "react-icons/bi";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

export const StudentCoursesCard = ({ myCoursesData, setCourseId }) => {
  const { setCourseMaterial } = useContext(DroneMasterContext)


  const showCourse = (course_id) => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setCourseMaterial(res.data)
        setCourseId(course_id)
      })
      .catch((err) => { })
  }

  return (
    <div className="courseListCard">
      {/* Card Title */}
      <div className="cardTitle">
        <div className="iconContainer">
          <GiClassicalKnowledge />
        </div>
        <div className="textContainer">
          <h6>Mis Cursos</h6>
        </div>
      </div>
      {/* Card Body */}
      <div className="cardBody">
        <ul className="courseList">
          {myCoursesData?.map((course, index) => {
            return (
              <div key={index} className="oculto">
                <li
                  key={course.course_id}
                  className="courseListRow"
                  onClick={() => {
                    showCourse(course?.course_id);
                  }}
                >
                  {course.course_name} <BiRightArrowAlt className="icon" />
                </li></div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
