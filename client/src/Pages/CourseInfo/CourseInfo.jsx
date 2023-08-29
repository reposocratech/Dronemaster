import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DroneMasterContext } from "../../context/DroneMasterProvider";
import { StarRating } from "../../components/StarRating/StarRating";
import { CourseContentDropDownList } from "./components/CourseContentDropDownList/CourseContentDropDownList";
import { CourseDescription } from "./components/CourseDescription/CourseDescription";
import { CircularStudentProgressBar } from "./components/CircularStudentProgressBar/CircularStudentProgressBar";

import { MdOutlinePlayLesson } from "react-icons/md";
import { IoInfinite } from "react-icons/io5";
import { GiClassicalKnowledge, GiSmartphone } from "react-icons/gi";
import {
  AiOutlineFolderOpen,
  AiOutlineClockCircle,
  AiOutlineTrophy,
} from "react-icons/ai";
import "./courseInfo.scss";

export const CourseInfo = () => {
  const { course_id } = useParams();
  const [courseGeneralInfo, setcouGeneralrseInfo] = useState();
  const [tagList, setTagList] = useState();
  const [courseUnitsLessons, setCourseUnitsLessons] = useState();
  const [unitsCount, setUnitsCount] = useState();
  const [lessonsCount, setLessonsCount] = useState();
  const [userCourseRelationship, setUserCourseRelationship] = useState();
  const [lessonsOneCourse, setLessonsOneCourse] = useState(0);
  const [lessonsViewedByStudent, setLessonsViewedByStudent] = useState();

  const { user } = useContext(DroneMasterContext);

  //Gets all units and lesson of a course
  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setCourseUnitsLessons(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id]);

  //Gets general info of a course
  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/courseInfo/${course_id}`)
      .then((res) => {
        setcouGeneralrseInfo(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [course_id]);
  console.log(courseGeneralInfo, "courseeedata");
  //Gets tags of a course
  useEffect(() => {
    axios
      .get(` http://localhost:4000/courses/courseTags/${course_id}`)
      .then((res) => {
        setTagList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //Check if user has already boy a course
  useEffect(() => {
    user &&
      axios
        .get(
          `http://localhost:4000/myProfile/myCourse/${user.user_id}/${course_id}`
        )
        .then((res) => setUserCourseRelationship(res.data))
        .catch((err) => console.log(err));
  }, [course_id, user]);

  console.log(userCourseRelationship);

  useEffect(() => {
    if (course_id) {
      axios
        .get(`http://localhost:4000/students/countLessonscourse/${course_id}`)
        .then((res) => {
          setLessonsOneCourse(res.data[0].count_lessons_Course);
        })
        .catch((err) => console.log(err));
    }
  }, [course_id]);

  useEffect(() => {
    if (course_id && user) {
      axios
        .get(
          `http://localhost:4000/students/countLessonsViewed/${user?.user_id}/${course_id}`
        )
        .then((res) => {
          setLessonsViewedByStudent(res.data[0].count_lessons_viewed);
        })
        .catch((err) => console.log(err));
    }
  }, [course_id, user]);

  useEffect(() => {
    //Counts units
    const unitSet = new Set();
    courseUnitsLessons?.forEach((item) => {
      if (item.unit_id !== null) {
        unitSet.add(item.unit_id);
      }
    });
    setUnitsCount(unitSet.size);

    //Counts lessons
    const lessonsSet = new Set();

    courseUnitsLessons?.forEach((item) => {
      if (item.lesson_id !== null) {
        lessonsSet.add(item.lesson_id);
      }
    });

    setLessonsCount(lessonsSet.size);
  }, [courseUnitsLessons]);

  return (
    <section className="courseInfoMainSection">
      {/* Course name title */}

      <div className="courseNameCard">
        <div className="cardTitle">
          <div className="title">
            <div className="iconContainer">
              <GiClassicalKnowledge />
            </div>
            <h2 className="titleText">{courseGeneralInfo?.course_name}</h2>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className="mainSide">
        {/* Introduccion Video or Image*/}

        <div className="introMultimedia">
          <img
            src="http://localhost:4000/images/courses/courseDefaultImg.jpg"
            alt="Course image"
          />
          <img
            className="watermarkImg"
            src="/dashboard_images/logo_DroneMaster.png"
            alt="Course image"
          />
        </div>
        <div className="courseTextInfoCard">
          {/* Course Description */}
          <CourseDescription
            description={courseGeneralInfo?.course_description}
          />

          {/* Course Units & Lessons List */}
          <CourseContentDropDownList
            user={user}
            myCourseInfo={courseUnitsLessons}
            unitsCount={unitsCount}
            lessonsCount={lessonsCount}
            course_id={course_id}
          />
        </div>
      </div>

      {/* Side section */}
      <aside className="rightAsideSection">
        {(userCourseRelationship == undefined ||
          userCourseRelationship?.length == 0) && (
          <div className="courseMultimediaInfoCard">
            {/* Course Image */}
            <div className="courseImgContainer">
              <img
                src={
                  courseGeneralInfo?.course_img &&
                  `http://localhost:4000/images/courses/${courseGeneralInfo?.course_img}`
                }
                alt="Course image"
              />
            </div>
            <div className="courseDataContent">
              <h6 className="courseTitle">{courseGeneralInfo?.course_name}</h6>
              <div className="tagList">
                {tagList?.map((e) => {
                  return (
                    <span key={e.tag_id} className="tag">
                      #{e.tag_name}
                    </span>
                  );
                })}
              </div>
              {/* Icon groups container */}
              <div className="iconInfoContainer">
                <h6 className="fw-medium">Este curso incluye:</h6>
                <div className="iconGroup1">
                  <AiOutlineClockCircle className="icon3" />
                  {courseGeneralInfo?.course_length} horas lectivas
                </div>
                <div className="iconGroup1">
                  <AiOutlineFolderOpen className="icon3" /> {unitsCount} Temas
                </div>
                <div className="iconGroup1">
                  <MdOutlinePlayLesson className="icon3" /> {lessonsCount}{" "}
                  Lecciones
                </div>
                <div className="iconGroup1">
                  <GiSmartphone className="icon3" /> Acceso movil
                </div>
                <div className="iconGroup1">
                  <IoInfinite className="icon3" /> Acceso de por vida
                </div>
                <div className="iconGroup1">
                  <AiOutlineTrophy className="icon3" /> Certificado de
                  finalización
                </div>
              </div>

              {/* Stars container */}
              {courseGeneralInfo?.score != null && (
                <div className="courseScore">
                  <div className="starsRatingContainer">
                    <StarRating rating={courseGeneralInfo?.score} />
                    <h4>{courseGeneralInfo?.score}</h4>
                  </div>
                  <h6 className="ratingCounter">
                    (
                    {courseGeneralInfo?.counter_rating
                      .toLocaleString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    )
                  </h6>
                </div>
              )}

              {/* Price & button */}
              <div className="coursePriceButton">
                {courseGeneralInfo?.price && (
                  <h4>
                    {courseGeneralInfo.price}{" "}
                    <span className="currency">€</span>
                  </h4>
                )}
                <button className="btnNormal">INSCRIBETE</button>
              </div>
            </div>
          </div>
        )}

        {(userCourseRelationship != undefined ||
          userCourseRelationship?.length != 0) && (
          <CircularStudentProgressBar
            lessonsOneCourse={lessonsOneCourse}
            lessonsViewedByStudent={lessonsViewedByStudent}
            course_name={courseGeneralInfo?.course_name}
          />
        )}
      </aside>
    </section>
  );
};
