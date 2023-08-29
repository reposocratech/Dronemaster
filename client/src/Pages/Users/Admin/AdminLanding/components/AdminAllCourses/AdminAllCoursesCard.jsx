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
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { CourseEditionModal } from "../../../../../Courses/components/CourseEditionModal/CourseEditionModal";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

const AdminAllCoursesCard = () => {
  const [allCourses, setAllCourses] = useState();
  const { course } = useContext(DroneMasterContext);
  const [openUnits, setOpenUnits] = useState([]);
  const [closeUnits, setCloseUnits] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [showCourseEditionModal, setShowCourseEditionModal] = useState(false);
  const [status, setStatus] = useState();

  const openEditModal = () => {
    setShowCourseEditionModal(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/allCourses")
      .then((res) => {
        setAllCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const enableCourse = () => {
    axios

      .put(` http://localhost:4000/courses/enableCourse/${course_id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const disableCourse = () => {
    axios

      .put(`http://localhost:4000/courses/disableCourse/${course_id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  //DROPDOWN

  const closedHeight = "0px";
  const openedHeight = "300px";

  const toggleUnit = (course) => {
    if (openUnits.includes(course)) {
      setOpenUnits(openUnits.filter((index) => index !== course));
    } else {
      setOpenUnits([...openUnits, course]);
    }
  };

  const onSubmit = (data) => {
    setSearchResultData(
      courses.filter((course) =>
        course.course_name
          .toLowerCase()
          .includes(data.courseSearch.toLowerCase())
      )
    );
    reset();
  };

  return (
    <Container className="adminTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />{" "}
          </div>
          <div>
            <h5 className="titleText">Todos los Cursos</h5>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="searchBar">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar Curso..."
              {...register("courseSearch")}
            />
          </div>
        </form>
      </div>

      <div className="cardBody">
        <table className="adTable">
          <thead>
            <tr>
              <th colSpan={2}>Material</th>

              {/*               <th className="iconHeadName">
                {" "}
                <HiOutlineMail className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex"></span>
              </th>
              <th className="iconHeadName">
                <AiOutlinePhone className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex"></span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {allCourses ? (
              <>
                {allCourses.length == 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {allCourses?.map((course) => {
                      return (
                        <tr key={course.course_id}>
                          <th className="textReduce text-warning w-75">
                            <div className="oculto">{course.course_name}</div>
                          </th>
                          <td></td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                {allCourses?.map((course) => {
                  return (
                    <tr key={course.course_id}>
                      <th className="textReduce ">{course.course_name}</th>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>

        {allCourses?.map((course) => {
          return (
            <table className="tableCellName mb-4">
              <tbody>
                <th className="tableCell w-75">
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
                  <span onClick={openEditModal}>
                    <BsPencil className="icon" />
                  </span>

                  <CourseEditionModal
                    setShowCourseEditionModal={setShowCourseEditionModal}
                    showCourseEditionModal={showCourseEditionModal}
                  />
                </th>
                <th>
                  <span>
                    <BsEye
                      onClick={() => enableCourse(course?.course_id)}
                      className="icon"
                    />
                  </span>
                </th>
                <span className="d-none d-md-inline "></span>

                <th>
                  <span onClick={disableCourse}>
                    <BsEyeSlash className="icon" />
                  </span>
                </th>
                <hr className="text-warning" />
              </tbody>

              <tbody>
                <div key={course}>
                  <div
                    className="dropdownContainer"
                    onClick={() => toggleUnit(course)}
                  >
                    {openUnits.includes(course) ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </div>
                </div>
                <div
                  className="listedLesson"
                  style={{
                    height: openUnits.includes(course)
                      ? openedHeight
                      : closedHeight,
                    transition: "height 0.75s ease-in-out",
                  }}
                >
                  <AdminViewOneCourse course_id={course.course_id} />
                </div>
              </tbody>
            </table>
          );
        })}
      </div>
    </Container>
  );
};

export default AdminAllCoursesCard;
