import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import "./AdminLanding.scss";
import AdminCard from "./components/AdminCard/AdminCard";
import AdminInfoCard from "./components/AdminInfoCard/AdminInfoCard";
import AdminContadorCard from "./components/AdminContador/AdminContadorCard";
import AdminAllCoursesCard from "./components/AdminAllCourses/AdminAllCoursesCard";
import AdminAllTeachersCard from "./components/AdminAllTeachers/AdminAllTeachersCard";
import AdminAllStudentsCard from "./components/AdminAllStudents/AdminAllStudentsCard";
import AdminChartCard from "./components/AdminChart/AdminChartCard";
import AdminNewUserCard from "./components/AdminNewUser/AdminNewUserCard";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";

const AdminLanding = () => {
  const [inscriptionDates, setInscriptionDates] = useState();
  const [moreInformationStudent, setMoreInformationStudent] = useState(false);
  const [moreInformationTeacher, setMoreInformationTeacher] = useState(false);
  const [showEditionModal, setShowEditionModal] = useState(false);
  const [moreInformationCourses, setMoreInformationCourses] = useState(false);

  const { user } = useContext(DroneMasterContext);

  useEffect((data) => {
    axios
      .get("http://localhost:4000/admin/inscriptionDates", data)
      .then((res) => {
        setInscriptionDates(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="mainSectionAdmin">
      <aside className="sideContent">
        <AdminCard setShowEditionModal={setShowEditionModal} />
        <AdminContadorCard />
        <AdminInfoCard />
        <AdminChartCard
          inscriptionDates={inscriptionDates}
          setInscriptionDates={setInscriptionDates}
        />
        <AdminNewUserCard />
      </aside>

      <div className="mainContainer">
        <AdminAllCoursesCard
          moreInformationCourses={moreInformationCourses}
          setMoreInformationCourses={setMoreInformationCourses}
        />
        <AdminAllTeachersCard
          moreInformationTeacher={moreInformationTeacher}
          setMoreInformationTeacher={setMoreInformationTeacher}
        />
        <AdminAllStudentsCard
          moreInformationStudent={moreInformationStudent}
          setMoreInformationStudent={setMoreInformationStudent}
        />
      </div>

 
      
        <EditMyProfileModal
          showEditionModal={showEditionModal}
          setShowEditionModal={setShowEditionModal}
          user={user}
        />
    
    </section>
  );
};

export default AdminLanding;
