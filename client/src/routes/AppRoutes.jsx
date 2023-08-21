
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBarApp from "../components/NavBar/NavBarApp";
import HomeApp from "../Pages/Home/HomeApp";
import RegisterForm from "../Pages/Users/RegisterForm/RegisterForm";
import LoginForm from "../Pages/Users/LoginForm/LoginForm";
import { AllCourses } from "../Pages/AllCourses/AllCourses";
import { AboutApp } from "../Pages/About/AboutApp";
import { FooterApp } from "../components/Footer/FooterApp";
import AdminLanding from '../Pages/Users/Admin/AdminLanding'
import StudentLanding from '../Pages/Users/Student/StudentLanding'
import { TeacherLanding } from '../Pages/Users/Teacher/TeacherLanding/TeacherLanding';
import { CourseInfo } from "../Pages/CourseInfo/CourseInfo";
import { TeacherMyCourse } from "../Pages/Users/Teacher/TeacherMyCourse/TeacherMyCourse";
import { EditMyProfile } from "../Pages/Users/EditMyProfile/EditMyProfile";

const AppRoutes = () => {
  return (
    <Container fluid className="p-0">
      <BrowserRouter>
        <NavBarApp />
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/allCourses" element={<AllCourses />} />
          <Route path="/about" element={<AboutApp />} />
          <Route path='/admin' element={< AdminLanding/>} />
          <Route path='/student' element={< StudentLanding/>} />
          <Route path="/courses/courseInfo/:course_id" element={<CourseInfo />}/>
          <Route path='/teacher' element={<TeacherLanding />} />
          <Route path='/teacher/MyCourse/:course_id' element={<TeacherMyCourse />} />
          <Route path='/user/editMyProfile/:user_id' element={<EditMyProfile />} />
        </Routes>
        <FooterApp />
      </BrowserRouter>
    </Container>
  );
};

export default AppRoutes;
