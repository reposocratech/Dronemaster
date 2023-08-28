import React from "react";
import { useParams } from "react-router-dom";
import { GiClassicalKnowledge } from "react-icons/gi";
export const CourseInfo = () => {
  const { course_id } = useParams();
  return (
    <section className="courseInfoMainSection">
      <div className="mainSide">
        <div className="courseNameCard">
          <div className="cardTitle">
            <div className="title">
              <div className="iconContainer">
                <GiClassicalKnowledge />
              </div>
              <h5 className="titleText">Mis Cursos</h5>
            </div>
          </div>
        </div>
      </div>
      <aside className="rightSide"></aside>
    </section>
  );
};
