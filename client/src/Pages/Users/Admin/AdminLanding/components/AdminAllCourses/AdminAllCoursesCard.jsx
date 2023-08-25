import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiSolidBookAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminViewOneCourse from "../AdminViewOneCourse/AdminViewOneCourse";
import { BsBook } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const AdminAllCoursesCard = () => {
  const [allCourses, setAllCourses] = useState();
  const [openUnits, setOpenUnits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/allCourses")
      .then((res) => {
        setAllCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //DROPDOWN

  const closedHeight = "0px";
  const openedHeight = "35px";

  const toggleUnit = (allCourses) => {
    if (openUnits.includes(allCourses)) {
      setOpenUnits(openUnits.filter((index) => index !== allCourses));
    } else {
      setOpenUnits([...openUnits, allCourses]);
    }
  };

  return (
    <Container className="adminTableCard">
      <div className="cardTitle">
        <div className="titleAdmin">
          <div className="iconContainer">
            <BsBook />
          </div>
          <h5 className="titleText m-3">Todos los Cursos</h5>
        </div>
        <button className="btnOutline3">Añadir nuevo curso</button>
      </div>
      {/*       <div className="dropdownContainer" onClick={() => toggleUnit(allCourses)}>
        {openUnits.includes(allCourses) ? (
          <IoMdArrowDropup />
        ) : (
          <IoMdArrowDropdown />
        )}
      </div> */}
      <div>
        <div>Contenido</div>

        <div>Recursos</div>
      </div>
      <hr />

      {allCourses?.map((course) => {
        return (
          <table className="coursesTableStudent mb-4">
            <tbody>
              <th className="textReduce text-warning w-75">
                <div className="oculto">{course?.course_name}</div>
              </th>
              <th>
                <AiOutlineClockCircle className="icon" />
                {course?.course_length}h
              </th>
              <th>
                <AiOutlineStar className="icon" /> {course?.score}
              </th>
              <th>
                <BsPencil className="icon" />
              </th>
              <th>
                <BsEye className="icon" />
              </th>
              <th>
                <BsEyeSlash className="icon" />
              </th>
              <hr className="text-warning" />
              {/* DROPDOWN */}
              <div
                className="dropdownContainer"
                onClick={() => toggleUnit(allCourses)}
              >
                {openUnits.includes(allCourses) ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                )}
              </div>
              <AdminViewOneCourse course_id={course.course_id} />
            </tbody>
          </table>
        );
      })}
    </Container>
  );
};

export default AdminAllCoursesCard;
