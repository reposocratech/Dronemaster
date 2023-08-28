import axios from "axios";
import React, { useEffect, useState } from "react";

import "./AdminLanding.scss";
import { Container } from "react-bootstrap";
import AdminCard from "./components/AdminCard/AdminCard";
import AdminInfoCard from "./components/AdminInfoCard/AdminInfoCard";
import AdminContadorCard from "./components/AdminContador/AdminContadorCard";
import AdminAllCoursesCard from "./components/AdminAllCourses/AdminAllCoursesCard";
import AdminAllTeachersCard from "./components/AdminAllTeachers/AdminAllTeachersCard";
import AdminAllStudentsCard from "./components/AdminAllStudents/AdminAllStudentsCard";
import AdminChartCard from "./components/AdminChart/AdminChartCard";
import AdminNewUserCard from "./components/AdminNewUser/AdminNewUserCard";

const AdminLanding = () => {
  const [allCourses, setAllCourses] = useState();
  const [allStudents, setAllStudents] = useState();
  const [allTeachers, setAllTeachers] = useState();
  const [inscriptionDates, setInscriptionDates] = useState();

  useEffect((data) => {
    axios
      .get("http://localhost:4000/admin/inscriptionDates", data)
      .then((res) => {
        setInscriptionDates(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //get all Courses - Pending

  /*             useEffect(() =>{

                axios
        
                .get(" http://localhost:4000/admin/allStudents")
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        
        
        
            }, []) */

  //get all Teachers

  useEffect((data) => {
    axios

      .get(" http://localhost:4000/admin/allTeachers", data)
      .then((res) => {
        setAllTeachers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //get all Students

  useEffect((data) => {
    axios

      .get(" http://localhost:4000/admin/allStudents", data)
      .then((res) => {
        setAllStudents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="mainSection">
      <aside className="sideContent">
        <AdminCard />
        <AdminContadorCard />
        <AdminInfoCard />
        <AdminChartCard
          inscriptionDates={inscriptionDates}
          setInscriptionDates={setInscriptionDates}
        />
        <AdminNewUserCard />
      </aside>

      <div className="mainContainer">
        <AdminAllCoursesCard />
        <AdminAllTeachersCard />
        <AdminAllStudentsCard />
      </div>
    </section>
  );
};

export default AdminLanding;
