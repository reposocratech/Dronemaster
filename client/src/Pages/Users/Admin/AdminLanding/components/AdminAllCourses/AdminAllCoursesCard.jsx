import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminAllCoursesCard = () => {
  const [courses, setAllCourses] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllCourses")
      .then((res) => {
        setAllCourses(res.data[0]);
        console.log(courses);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <h4>Todos los cursos</h4>

      {courses?.map((course) => {
        return (
          <tr key={course.course_id}>
            <td className="tableCellName">
              {teacher.user_name} {teacher.user_lastname}
            </td>
            <td className="d-none d-md-block py-2">
              <div className="tableCell iconCell">
                <div className="tableCellContent">
                  <AiOutlineClockCircle className="icon" />
                </div>
              </div>
            </td>
            <td>
              <div className="tableCell iconCell">
                <div className="tableCellContent">
                  <AiOutlineFolderOpen className="icon" />{" "}
                </div>
              </div>
            </td>
            <td>
              <div className="tableCell iconCell">
                <div className="tableCellContent">
                  <AiOutlineUser className="icon" />
                </div>
              </div>
            </td>
            <td className="d-none d-md-block py-2">
              <div className="tableCell iconCell">
                <div className="tableCellContent">
                  <AiOutlineStar className="icon" /> {}
                </div>
              </div>
            </td>
            <td>
              <button
                className="btnOutline1"
                onClick={() => {
                  navigate(`/courses/courseInfo/}`);
                }}
              >
                <span className="d-none d-md-flex">Mas info</span>
                <span className="d-md-none d-flex">
                  <AiOutlineArrowRight />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </div>
  );
};

export default AdminAllCoursesCard;
