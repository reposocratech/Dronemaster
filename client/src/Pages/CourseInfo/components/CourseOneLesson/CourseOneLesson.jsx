import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import axios from "axios";

import { CourseDescription } from "../CourseDescription/CourseDescription";
import { MdOutlinePlayLesson } from "react-icons/md";
import { UnitsLessonList } from "./components/UnitsLessonList";
import "./courseOneLesson.scss";

export const CourseOneLesson = () => {
  const { course_id, unit_id, lesson_id } = useParams();
  const [courseGeneralInfo, setcouGeneralrseInfo] = useState();
  const [lessonData, setLessonData] = useState();
  const [unitsCount, setUnitsCount] = useState();
  const [lessonsCount, setLessonsCount] = useState();
  const [courseUnitsLessons, setCourseUnitsLessons] = useState();

  const { user } = useContext(DroneMasterContext);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/courses/courseInfo/lessonInfo/${course_id}/${unit_id}/${lesson_id}`
      )
      .then((res) => {
        setLessonData(res.data[0]);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setCourseUnitsLessons(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id]);

  console.log(courseUnitsLessons);
  return (
    <section className="lessonInfoMainSection">
      {/* Course name title */}
      <div className="courseNameCard">
        <div className="cardTitle">
          <div className="title">
            <div className="iconContainer">
              <MdOutlinePlayLesson />
            </div>
            <h2 className="titleText">{lessonData?.lesson_title}</h2>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className="mainSide">
        {/* Introduccion Video or Image*/}

        <div className="introMultimedia">
          <img
            src="http://localhost:4000/images/resources/leccion1.jpg"
            alt="Course image"
          />
        </div>
        <div className="courseTextInfoCard">
          {/* Course Description */}
          <CourseDescription description={lessonData?.lesson_content} />

          {/* Course Units & Lessons List */}
        </div>
      </div>

      {/* Side section */}
      <aside className="rightAsideSection">
        <UnitsLessonList    myCourseInfo={courseUnitsLessons}    course_id={course_id}/>
      </aside>
    </section>
  );
};
