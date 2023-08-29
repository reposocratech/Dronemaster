import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./allCoursesStyle.scss";
import { CategoryContainer } from "./allCourseComponents/CategoryContainer/CategoryContainer";
import { DroneMasterContext } from "../../context/DroneMasterProvider";
import { CourseCard } from "../../components/CardCourse/CourseCard";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export const AllCourses = () => {

  const [categoryData, setCategoryData] = useState()
  const [courseData, setCourseData] = useState()
  const [counter, setCounter] = useState(0);
  const [counterRatio, setCounterRatio] = useState(1);
  const { course } = useContext(DroneMasterContext);


  //Gets categories data
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/allCategories")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  //Gets course data
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/allCourses")
      .then((res) => {
        setCourseData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && window.innerWidth < 1100) {
        setCounterRatio(1);
      } else if (window.innerWidth >= 1100 && window.innerWidth < 1400) {
        setCounterRatio(2);
      } else if (window.innerWidth >= 1400 && window.innerWidth < 1700) {
        setCounterRatio(3);
      } else if (window.innerWidth >= 1700) {
        setCounterRatio(4);
      }
    };

    handleResize(); // Call initially
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className='allCoursesContainer px-sm-5'>
      {!course && categoryData?.map((cat) => {
        return (
          <CategoryContainer key={cat.category_id} category_id={cat.category_id} category_name={cat.category_name} courseData={courseData} />
        )
      })}

      {(course?.length === 0 || course === undefined) && (
        <>
          <div className="categoryContainer">
            <h2 className="categoryTitle text-center text-md-start">
              No existe resultado de búsqueda
            </h2>
            <div className="courseCardContainerWrapper">
              <div className="courseCardContainer"></div>
            </div>
          </div>
        </>
      )}

      {course?.length > 0 && (
        <div className="allCoursesContainer p-0 px-sm-5">
          <div className="categoryContainer">
            <h2 className="categoryTitle text-center text-md-start">
              Resultado de búsqueda
            </h2>
            <div className="courseCardContainerWrapper">
              {counter !== 0 ? (
                <div className="navigationButtonContainerLeft">
                  <MdNavigateBefore
                    className="navigationButton"
                    onClick={() => setCounter(counter - counterRatio)}
                  />
                </div>
              ) : (
                <div className="navigationButtonContainerLeft">
                  <MdNavigateBefore className="navigationButton opacity-0" />
                </div>
              )}
              <div className="courseCardContainer">
                {course?.slice(counter, counter + counterRatio).map((elem) => {
                  return <CourseCard oneCourse={elem} />;
                })}
              </div>
              {counter + counterRatio < course?.length ? (
                <div className="navigationButtonContainerRight">
                  <MdNavigateNext
                    className="navigationButton"
                    onClick={() => setCounter(counter + counterRatio)}
                  />
                </div>
              ) : (
                <div className="navigationButtonContainerRight">
                  <MdNavigateNext className="navigationButton opacity-0" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
