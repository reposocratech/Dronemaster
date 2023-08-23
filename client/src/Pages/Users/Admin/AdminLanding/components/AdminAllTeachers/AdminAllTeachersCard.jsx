import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

const AdminAllTeachersCard = () => {
  const [teachers, setTeachers] = useState();

  const { user } = useContext(DroneMasterContext);

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/getAllCourses")
      .then((res) => {
        setTeachers(res.data[0]);
        console.log(teachers);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h4>Todos los Profesores</h4>
    </div>
  );
};

export default AdminAllTeachersCard;
