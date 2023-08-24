import React, { useContext, useEffect, useState } from "react";
import { TeacherCard } from "../TeacherLanding/components/TeacherCard/TeacherCard";
import { CounterCard } from "../TeacherLanding/components/CounterCard/CounterCard";
import { TeacherOneCourseStudentsTable } from "./components/TeacherOneCourseStudentsTable/TeacherOneCourseStudentsTable";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { TeacherCoursesCard } from "../TeacherLanding/components/TeacherCoursesCard/TeacherCoursesCard";
import { TeacherOnecourseContent } from "./components/TeacherOnecourseContent/TeacherOnecourseContent";
import { CourseStatsChart } from "./components/CourseStatsChart/CourseStatsChart";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./teacherMyCourse.scss";



export const TeacherMyCourse = () => {
  const { user, setCourseMaterial } = useContext(DroneMasterContext);
  const { course_id } = useParams();
  const [myCourseInfo, setMyCourseInfo] = useState();
  const [myOneCourseStudentsData, setMyOneCourseStudentsData] = useState();
  const [showEditionModal, setShowEditionModal] = useState(false);
  const [myCoursesData, setMyCoursesData] = useState();
  const [inscriptionDates, setInscriptionDates] = useState()
  
  useEffect(() => {
    axios
    .get(`http://localhost:4000/teachers/myCourses/inscriptionDates/${course_id}`)
    .then((res) => {
      setInscriptionDates(res.data)
      console.log(res.data,  "aaaaaaaaaaaaaaaaaaaaaaaaaa");;
    })
    .catch((error) => console.log(error));

  }, [course_id])
  

  //Get all courses of the user
  useEffect(() => {
    axios
      .get(`http://localhost:4000/showMyCourses/${user?.user_id}`)
      .then((res) => {
        setMyCoursesData(res.data);
      })
      .catch((error) => console.log(error));
  }, [user]);

  useEffect(() => {
    //Get all students info from a course
    axios
      .get(`http://localhost:4000/teachers/myCourses/students/${course_id}`)
      .then((res) => {
        console.log(res.data);
        setMyOneCourseStudentsData(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id]);
  //Get all info of a course
  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setMyCourseInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id]);

  return (
    <section className="mainSectionOneCourse">
      <aside className="sideContent">
        <TeacherCard user={user} setShowEditionModal={setShowEditionModal} />

        <div className="counterContainer">
          <CounterCard
            title={"Puntación media"}
            counter={`${myCourseInfo && myCourseInfo[0]?.course_score}/5`}
          >
            <AiFillStar />
          </CounterCard>
          <CounterCard
            title={"Alumnos totales"}
            counter={myOneCourseStudentsData?.length}
          >
            <AiOutlineUser />
          </CounterCard>
        </div>
        <TeacherCoursesCard myCoursesData={myCoursesData} />
      </aside>
      <div className="mainContainer">
        <TeacherOneCourseStudentsTable
          myOneCourseStudentsData={myOneCourseStudentsData} 
        />

        <TeacherOnecourseContent myCourseInfo={myCourseInfo} />

        {/* <CourseStatsChart inscriptionDates={inscriptionDates} /> */}
      
      </div>
      <EditMyProfileModal
        showEditionModal={showEditionModal}
        setShowEditionModal={setShowEditionModal}
        user={user}
      />
    </section>
  );
};
