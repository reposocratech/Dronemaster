import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseCard.scss";
import { StarRating } from "../StarRating/StarRating";
import { useNavigate } from "react-router-dom";


export const CourseCard = ({ oneCourse }) => {
  const navigate = useNavigate();
  const [tagList, setTagList] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/courseTags/${oneCourse.course_id}`)
      .then((res) => setTagList(res.data))
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, [oneCourse]);

  return (
    <div
      className="courseCard"
      onClick={() => navigate(`/courses/courseInfo/${oneCourse.course_id}`)}
    >
      <button className="btnNormal">Mas info</button>
      <div className="courseCardContent">
        <div className="coursePreviewContainer">
          <img
            className="preview"
            src="/images/courseImages/curso1.jpg"
            alt=""
          />
        </div>
        <div className="courseCardBody">
          <h4 className="courseTitle">{oneCourse.course_name}</h4>
          <div className="tagList">
            {tagList?.map((e) => {
              return <span key={e.tag_id} className="tag">#{e.tag_name}</span>;
            })}
          </div>
          {oneCourse?.score != null && (
            <div className="courseScore">
              <h5>{oneCourse.score}</h5>
              <StarRating rating={oneCourse.score} />
              <h6 className="ratingCounter">
                (
                {oneCourse.counter_rating
                  .toLocaleString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                )
              </h6>
            </div>
          )}
          <div className="coursePriceButton">
            <h4>
              {oneCourse.price} <span className="currency">€</span>
            </h4>
            <button
              className="btnOutline1"
              onClick={() =>
                navigate(`/courses/courseInfo/${oneCourse.course_id}`)
              }
            >
              INSCRIBETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
