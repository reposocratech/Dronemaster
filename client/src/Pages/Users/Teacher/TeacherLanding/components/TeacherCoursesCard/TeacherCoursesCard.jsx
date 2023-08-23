import React, { useContext, useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { BiRightArrowAlt } from "react-icons/bi";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

export const TeacherCoursesCard = ({ myCoursesData }) => {
  const { courseMaterial, setCourseMaterial } = useContext(DroneMasterContext)

  const showCourse = (id) => {
    let name = myCoursesData?.find(item => item.course_id === parseInt(id)).course_name
    let unit = [];
    let lesson = []

    axios
      .get(`http://localhost:4000/students/units/${id}`)
      .then((res) => {
        unit = res.data
      })
      .catch((err) => console.log(err))

    axios
      .get(`http://localhost:4000/students/lessons/${id}`)
      .then((res) => {
        lesson = res.data
      })
      .catch((err) => console.log(err))

    setCourseMaterial({ ...courseMaterial, course_name: name, unit_tittle: unit, lesson_title: lesson })
  }

  console.log(courseMaterial);

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
          {myCoursesData?.map((course) => {
            return (
              <li key={course.course_id} className="courseListRow" onClick={() => { showCourse(course?.course_id) }}>
                {course.course_name} <BiRightArrowAlt className="icon" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
