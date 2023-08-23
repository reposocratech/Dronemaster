import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminAllCoursesCard = () => {
  const [courses, setAllCourses] = useState();

  /*   useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllCourses")
      .then((res) => {
        setAllCourses(res.data[0]);
        console.log(courses);
      })
      .catch((err) => console.log(err));
  }); */

  return (
    <div>
      <h4>Todos los cursos</h4>
    </div>
  );
};

export default AdminAllCoursesCard;
