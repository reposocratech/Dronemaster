import React, { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { CourseCard } from "../../../../components/CardCourse/CourseCard";

export const CategoryContainer = ({
  courseData,
  category_id,
  category_name,
}) => {
  const [courseByCategory, setCourseByCategory] = useState();
  const [counter, setCounter] = useState(0);
  const [counterRatio, setCounterRatio] = useState(1);

  useEffect(() => {
    setCourseByCategory(
      courseData?.filter((course) => course.category_id === category_id)
    );
  }, [courseData]);

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
    <div className="categoryContainer">
      <h2 className="categoryTitle text-center text-md-start">{category_name}</h2>
      <div className="courseCardContainerWrapper">
        {counter !== 0 ?
          <div className="navigationButtonContainerLeft">
            <MdNavigateBefore
              className="navigationButton"
              onClick={() => setCounter(counter - counterRatio)}
            />
          </div> : <div className="navigationButtonContainerLeft">
            <MdNavigateBefore
              className="navigationButton opacity-0"
            />
          </div>
        }
        <div className="courseCardContainer">
          {courseByCategory
            ?.slice(counter, counter + counterRatio)
            .map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              );
            })}
        </div>
        {counter + counterRatio < courseByCategory?.length ?
          <div className="navigationButtonContainerRight">
            <MdNavigateNext
              className="navigationButton"
              onClick={() => setCounter(counter + counterRatio)}
            />
          </div> : <div className="navigationButtonContainerRight">
            <MdNavigateNext
              className="navigationButton opacity-0"
            />
          </div>
        }
      </div>
    </div>
  );
};
