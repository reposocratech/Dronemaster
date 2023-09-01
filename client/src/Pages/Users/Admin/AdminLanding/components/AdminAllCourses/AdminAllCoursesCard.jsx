import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminViewOneCourse from "../AdminViewOneCourse/AdminViewOneCourse";
import { BsBook } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { BsPlusCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { CourseEditionModal } from "../../../../../Courses/components/CourseEditionModal/CourseEditionModal";
import { UnitCreationModal } from "../../../../../Courses/components/CourseCreationModal/UnitCreationModal/UnitCreationModal";
import { useNavigate } from "react-router-dom";

const AdminAllCoursesCard = ({ resEffect, setResEffect }) => {
  const navigate = useNavigate()
  const [allCourses, setAllCourses] = useState();
  const [openCourse, setOpenCourse] = useState([]);
  const { reset, handleSubmit, register } = useForm();
  const [showCourseEditionModal, setShowCourseEditionModal] = useState(false);
  const [showUnitCreationModal, setShowUnitCreationModal] = useState(false);

  const [courseId, setCourseId] = useState();
  const [searchResultCourse, setsearchResultCourse] = useState();
  const openEditModal = (course_id) => {
    setCourseId(course_id)
    setShowCourseEditionModal(true);
  };
  const openUnitCreateModal = () => {
    setShowUnitCreationModal(true);
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/allCourses")
      .then((res) => {
        setAllCourses(res.data);
      })
      .catch((err) => { });
  }, [resEffect]);
  const enableCourse = (courseId) => {
    axios
      .put(`http://localhost:4000/courses/enableCourse/${courseId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {
        { }
      });
  };
  const disableCourse = (courseId) => {
    axios
      .put(`http://localhost:4000/courses/disableCourse/${courseId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {
        { }
      });
  };
  //DROPDOWN
  const closedHeight = "0px";
  const openedHeight = "300px";
  const toggleCourse = (courseIdx) => {
    if (openCourse.includes(courseIdx)) {
      setOpenCourse(openCourse.filter((index) => index !== courseIdx));
    } else {
      setOpenCourse([...openCourse, courseIdx]);
    }
  };
  //Buscador
  const onSubmit = (data) => {
    setsearchResultCourse(
      allCourses?.filter((course) =>
        course.course_name
          .toLowerCase()
          .includes(data.courseSearch.toLowerCase())
      )
    );
    reset();
  };
  return (
    <div div className="allUnitsLessonCard" >
      <div className="adminCoursesList">
        <div className="cardTitle">
          <div className="listContainer">
            <div className="title">
              <div className="iconContainer">
                <BsBook />
              </div>
              <h5 className="titleText">Todos los Cursos</h5>
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
            {searchResultCourse && (
              <button
                onClick={() => setsearchResultCourse()}
                className="btnOutline1 m-3"
              >
                Ver todos
              </button>
            )}
          </div>
        </div>
        {searchResultCourse ? (
          <>
            {searchResultCourse?.length === 0 ? (
              <p>Sin resultados de busqueda</p>
            ) : (
              <>
                {searchResultCourse?.map((course, courseIdx) => {
                  return (
                    <div key={course.course_id} className="courseListed">
                      <div className="courseRow">
                        {/* CourseName */}
                        <div className="courseNameIconCont">
                          <h6 className="courseName">
                            <AiOutlineFolderOpen className="icon me-1" />
                            {course.course_name}
                          </h6>
                          <div
                            className="iconInfoContainer"
                            onClick={() => toggleCourse(courseIdx)}
                          >
                            {openCourse.includes(courseIdx) ? (
                              <IoMdArrowDropup />
                            ) : (
                              <IoMdArrowDropdown />
                            )}
                          </div>
                        </div>
                        <div className="courseIconsFuncitionsButtonsContainer">
                          {/* Icon edition creation etc */}
                          <div className="iconFuncionsCont">
                            <span className="icon" onClick={() => openEditModal(course.course_id)}>
                              <BsPencil />
                            </span>
                            {course?.course_is_hidden === 1 ? (
                              <span
                                className="icon"
                                onClick={(e) => {
                                  e.preventDefault();
                                  enableCourse(course.course_id);
                                }}
                              >
                                <BsEye />
                              </span>
                            ) : (
                              <span
                                className="icon"
                                onClick={(e) => {
                                  e.preventDefault();
                                  disableCourse(course.course_id);
                                }}
                              >
                                <BsEyeSlash />
                              </span>
                            )}
                            <button className="btnOutline1">Ver más</button>
                          </div>
                          {/* Info icons */}
                          <div className="iconsInfoCont">
                            <div className="courseIconCont">
                              <AiOutlineClockCircle className="icon" />
                              {course?.course_length}h
                            </div>
                            <div className="courseIconCont">
                              <AiOutlineStar className="icon" /> {course?.score}
                            </div>
                            <div className="courseIconCont">
                              <button
                                className="buttonText"
                                onClick={() => {
                                  openUnitCreateModal(true);
                                  setCourseId(course.course_id);
                                }}
                              >
                                Tema <BsPlusCircle className="icon" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AdminViewOneCourse
                        course_id={course?.course_id}
                        resEffect={resEffect}
                        setResEffect={setResEffect}
                        openCourse={openCourse}
                        courseIdx={courseIdx}
                      />
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {allCourses?.map((course, courseIdx) => {
              return (
                <div key={course.course_id} className="courseListed">
                  <div className="courseRow">
                    {/* CourseName */}
                    <div className="courseNameIconCont">
                      <h6 className="courseName">
                        <AiOutlineFolderOpen className="icon me-1" />
                        {course.course_name}
                      </h6>
                      <div
                        className="iconInfoContainer"
                        onClick={() => toggleCourse(courseIdx)}
                      >
                        {openCourse.includes(courseIdx) ? (
                          <IoMdArrowDropup />
                        ) : (
                          <IoMdArrowDropdown />
                        )}
                      </div>
                    </div>
                    <div className="courseIconsFuncitionsButtonsContainer">
                      {/* Icon edition creation etc */}
                      <div className="iconFuncionsCont">
                        <span className="icon" onClick={() => openEditModal(course.course_id)}>
                          <BsPencil />
                        </span>
                        {course?.course_is_hidden === 1 ? (
                          <span
                            className="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              enableCourse(course.course_id);
                            }}
                          >
                            <BsEye />
                          </span>
                        ) : (
                          <span
                            className="icon"
                            onClick={(e) => {
                              e.preventDefault();
                              disableCourse(course.course_id);
                            }}
                          >
                            <BsEyeSlash />
                          </span>
                        )}
                        <button className="btnOutline1" onClick={() => navigate(`/courses/courseInfo/${course.course_id}`)}>Ver más</button>
                      </div>
                      {/* Info icons */}
                      <div className="iconsInfoCont">
                        <div className="courseIconCont">
                          <AiOutlineClockCircle className="icon" />
                          {course?.course_length}h
                        </div>
                        <div className="courseIconCont">
                          <AiOutlineStar className="icon" /> {course?.score}
                        </div>
                        <div className="courseIconCont">
                          <button
                            className="buttonText"
                            onClick={() => {
                              openUnitCreateModal(true);
                              setCourseId(course.course_id);
                            }}
                          >
                            Tema <BsPlusCircle className="icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AdminViewOneCourse
                    course_id={course?.course_id}
                    resEffect={resEffect}
                    setResEffect={setResEffect}
                    openCourse={openCourse}
                    courseIdx={courseIdx}
                  />
                </div>
              );
            })}
          </>
        )}
        <CourseEditionModal
          setShowCourseEditionModal={setShowCourseEditionModal}
          showCourseEditionModal={showCourseEditionModal}
          course={allCourses}
          courseId={courseId}
          setCourseId={setCourseId}
        />
        <UnitCreationModal
          setShowUnitCreationModal={setShowUnitCreationModal}
          showUnitCreationModal={showUnitCreationModal}
          courseId={courseId}
          resEffect={resEffect}
          setResEffect={setResEffect}
        />
      </div>
    </div >
  );
};
export default AdminAllCoursesCard;












