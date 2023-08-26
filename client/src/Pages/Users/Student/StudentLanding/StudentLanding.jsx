import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StudentCard } from "./components/StudentCard/StudentCard";
import { UserCardInfo } from "../../Teacher/TeacherLanding/components/UserCardInfo.jsx/UserCardInfo";
import { CourseCard } from "../../../../components/CardCourse/CourseCard";
import { StudentCoursesCard } from "../StudentLanding/components/StudentCoursesCard/StudentCoursesCard";
import "./studentLandingStyle.scss";
import "../../Teacher/TeacherLanding/teacherLandingStyle.scss";
import "../../../AllCourses/allCoursesStyle.scss";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { StudentCourseTableInfo } from "./components/CourseInfo/StudentCourseTableInfo";
import { CircularBarProgress } from "./components/CircularBarProgress/CircularBarProgress";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";

const StudentLanding = () => {
  const { user } = useContext(DroneMasterContext);
  const [myCoursesData, setMyCoursesData] = useState();
  const [bestRatedCourses, setBestRatedCourses] = useState([]);
  const [lessonsViewedByStudent, setLessonsViewedByStudent] = useState()
  const [lessonsOneCourse, setLessonsOneCourse] = useState(0)
  const [courseId, setCourseId] = useState(0)
  const [showEditionModal, setShowEditionModal] = useState(false);

  //Get all courses of the user
  useEffect(() => {
    axios
      .get(`http://localhost:4000/showMyCourses/${user?.user_id}`)
      .then((res) => {
        setMyCoursesData(res.data);
      })
      .catch((error) => console.log(error));
  }, [user, setLessonsOneCourse, setLessonsViewedByStudent]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/bestRatedCourses")
      .then((res) => {
        setBestRatedCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mainSection">
      <aside className="sideContent">
        <StudentCard user={user} setShowEditionModal={setShowEditionModal} />
        <UserCardInfo user={user} />
        <StudentCoursesCard myCoursesData={myCoursesData} setCourseId={setCourseId} />
        {courseId !== 0 && <CircularBarProgress lessonsOneCourse={lessonsOneCourse} lessonsViewedByStudent={lessonsViewedByStudent} courseId={courseId} myCoursesData={myCoursesData} />}
      </aside>
      <div className="mainContainer">
        {myCoursesData?.length === 0 && (
          <div className="topCourses justify-content-center  flex-wrap gap-5 pt-5 ">
            {bestRatedCourses.map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              );
            })}
          </div>
        )}

        {myCoursesData?.length > 0 && (
          <div>
            <StudentCourseTableInfo myCoursesData={myCoursesData} setLessonsViewedByStudent={setLessonsViewedByStudent} setLessonsOneCourse={setLessonsOneCourse}
              courseId={courseId} />
          </div>
        )}
      </div>
      <EditMyProfileModal
        showEditionModal={showEditionModal}
        setShowEditionModal={setShowEditionModal}
        user={user}
      />
    </div>
  );
};

export default StudentLanding;
