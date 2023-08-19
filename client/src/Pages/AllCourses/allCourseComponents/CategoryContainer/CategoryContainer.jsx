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
  const [counterRatio, setCounterRatio] = useState(5);

  useEffect(() => {
    setCourseByCategory(
      courseData?.filter((course) => course.category_id === category_id)
    );
  }, [courseData]);

 
  console.log(counterRatio, "Couuuuuuuuuunter");
  return (
    <div className="categoryContainer">
      <h2 className="categoryTitle">{category_name}</h2>
      <div className="courseCardContainerWrapper">
        {counter !== 0 && (
          <div className="navigationButtonContainerLeft">
            <MdNavigateBefore
              className="navigationButton"
              onClick={() => setCounter(counter - counterRatio)}
            />
          </div>
        )}
        <div className="courseCardContainer">
          {courseByCategory
            ?.slice(counter, counter + counterRatio)
            .map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              );
            })}
        </div>
        {counter + counterRatio < courseByCategory?.length && (
          <div className="navigationButtonContainerRight">
            <MdNavigateNext
              className="navigationButton"
              onClick={() => setCounter(counter + counterRatio)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
