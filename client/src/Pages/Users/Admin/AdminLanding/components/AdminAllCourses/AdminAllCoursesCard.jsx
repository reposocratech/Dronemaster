import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import AdminViewOneCourse from "../AdminViewOneCourse/AdminViewOneCourse";
import { BsBook } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { BsPlusCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { CourseEditionModal } from "../../../../../Courses/components/CourseEditionModal/CourseEditionModal";
import { UnitCreationModal } from "../../../../../Courses/components/CourseCreationModal/UnitCreationModal/UnitCreationModal";

const AdminAllCoursesCard = () => {
  const [allCourses, setAllCourses] = useState();
  const [openCourse, setOpenCourse] = useState([]);
  const { reset } = useForm();
  const [showCourseEditionModal, setShowCourseEditionModal] = useState(false);
  const [showUnitCreationModal, setShowUnitCreationModal] = useState(false);
  const [resEffect, setResEffect] = useState(false);
  const openEditModal = () => {
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
      .catch((err) => console.log(err));
  }, [resEffect]);

  const enableCourse = (courseId) => {
    axios
      .put(`http://localhost:4000/courses/enableCourse/${courseId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const disableCourse = (courseId) => {
    axios
      .put(`http://localhost:4000/courses/disableCourse/${courseId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //DROPDOWN

  const closedHeight = "0px";
  const openedHeight = "300px";

  const toggleCourse = (course) => {
    if (openCourse.includes(course)) {
      setOpenCourse(openCourse.filter((index) => index !== course));
    } else {
      setOpenCourse([...openCourse, course]);
    }
  };
  //Buscador
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
    <div className="allUnitsLessonCard">
      <div className="adminTableCard">
        <div className="cardTitle">
          <div className="listContainer">
            <div className="title">
              <div className="iconContainer">
                <BsBook />
              </div>
              <h5 className="titleText">Todos los Cursos</h5>
            </div>
          </div>
        </div>

        {allCourses?.map((course) => {
          return (
            <div key={course.course_id} className="unitList">
              <div className="unitTittle">
                <h6>
                  <AiOutlineFolderOpen className="icon2 me-2" />
                  {course.course_name}
                  <div>
                    <AiOutlineClockCircle className="icon" />
                    {course?.course_length}h
                  </div>
                  <div>
                    <AiOutlineStar className="icon" /> {course?.score}
                  </div>
                  <div>
                    <span onClick={openUnitCreateModal}>
                      <BsPlusCircleFill className="icon" />
                    </span>

                    <UnitCreationModal
                      setShowUnitCreationModal={setShowUnitCreationModal}
                      showUnitCreationModal={showUnitCreationModal}
                      course_id={course.course_id}
                      resEffect={resEffect}
                      setResEffect={setResEffect}
                    />
                  </div>
                  <span onClick={openEditModal}>
                    <BsPencil />
                  </span>

                  {course?.course_is_hidden === 1 ? (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        enableCourse(course.course_id);
                      }}
                    >
                      <BsEye />
                    </span>
                  ) : (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        disableCourse(course.course_id);
                      }}
                    >
                      <BsEyeSlash />
                    </span>
                  )}
                  <button className="btnOutline1">Ver más</button>
                </h6>

                <CourseEditionModal
                  setShowCourseEditionModal={setShowCourseEditionModal}
                  showCourseEditionModal={showCourseEditionModal}
                  course={course}
                  course_id={course.course_id}
                />

                <div
                  className="dropdownContainer"
                  onClick={() => toggleCourse(course)}
                >
                  {openCourse.includes(course) ? (
                    <IoMdArrowDropup />
                  ) : (
                    <IoMdArrowDropdown />
                  )}
                </div>

                <div>
                  <AdminViewOneCourse
                    course_id={course?.course_id}
                    resEffect={resEffect}
                    setResEffect={setResEffect}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAllCoursesCard;
