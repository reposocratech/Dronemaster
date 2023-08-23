import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StudentCard } from "./components/StudentCard/StudentCard";
import { UserCardInfo } from "../../Teacher/TeacherLanding/components/UserCardInfo.jsx/UserCardInfo";
import { CourseCard } from "../../../../components/CardCourse/CourseCard";
import { TeacherCoursesCard } from "../../Teacher/TeacherLanding/components/TeacherCoursesCard/TeacherCoursesCard";
import "./studentLandingStyle.scss";
import "../../Teacher/TeacherLanding/teacherLandingStyle.scss";
import "../../../AllCourses/allCoursesStyle.scss";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { StudentCourseTableInfo } from "./components/CourseInfo/StudentCourseTableInfo";

const StudentLanding = () => {
  const { user } = useContext(DroneMasterContext);
  const [myCoursesData, setMyCoursesData] = useState();
  const [bestRatedCourses, setBestRatedCourses] = useState([]);

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
        <StudentCard user={user} />
        <UserCardInfo user={user} />
        <TeacherCoursesCard myCoursesData={myCoursesData} />
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
            <StudentCourseTableInfo myCoursesData={myCoursesData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLanding;
