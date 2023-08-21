import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./teacherLandingStyle.scss";
import { TeacherCard } from "./components/TeacherCard/TeacherCard";
import { CounterCard } from "./components/CounterCard/CounterCard";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { GiClassicalKnowledge } from "react-icons/gi";
import { TeacherCoursesCard } from "./components/TeacherCoursesCard/TeacherCoursesCard";
import { TeacherCoursesTableCard } from "./components/TeacherCoursesTableCard/TeacherCoursesTableCard";
import { TeacherStudentsTableCard } from "./components/TeacherStudentsTableCard/TeacherStudentsTableCard";


export const TeacherLanding = () => {
  const {user} = useContext();
  const [myCoursesData, setMyCoursesData] = useState();
  const [myStudentsData, setMyStudentsData] = useState();
  const [averageRating, setAverageRating] = useState()

  //Get all courses of the user
  useEffect(() => {
    axios
      .get(`http://localhost:4000/showMyCourses/${user.user_id}`)
      .then((res) => {
        setMyCoursesData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Get all students of the user
  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myStudents/${user.user_id}`)
      .then((res) => {
        setMyStudentsData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let sum = 0;
    let counter = 0;
    myCoursesData?.forEach((element) => {
      if (element.score > 0) {
        sum += element.score;
        counter += 1;
      }
    });
    if (sum != 0 && counter != 0){
      setAverageRating(sum / counter)
    }
  }, [myCoursesData]);

  console.log(myCoursesData, "My courses");
  console.log(myStudentsData, "My students");

  return (
    <section className="mainSection">
      <aside className="sideContent">
        <TeacherCard user={user} />

        <CounterCard title={"Puntación media"} counter={`${averageRating?.toFixed(1)}/5`}>
          <AiFillStar />
        </CounterCard>

        <CounterCard title={"Alumnos totales"} counter={myStudentsData?.length}>
          <AiOutlineUser />
        </CounterCard>

        <CounterCard title={"Cursos totales"} counter={myCoursesData?.length}>
          <GiClassicalKnowledge />
        </CounterCard>

        <TeacherCoursesCard myCoursesData={myCoursesData} />
      </aside>
      <div className="mainContainer">
        <TeacherCoursesTableCard myCoursesData={myCoursesData}/>
        <TeacherStudentsTableCard myStudentsData={myStudentsData}/>
      </div>
    </section>
  );
};
