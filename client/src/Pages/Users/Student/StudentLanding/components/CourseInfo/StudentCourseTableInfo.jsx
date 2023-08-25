import React, { useContext, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { CourseCard } from "../../../../../../components/CardCourse/CourseCard";
import { AiFillEye, AiFillFile } from "react-icons/ai";
import "../../studentLandingStyle.scss";

export const StudentCourseTableInfo = ({ myCourseData, bestRatedCourses }) => {
  const { courseMaterial, user } = useContext(DroneMasterContext);
  console.log(courseMaterial);

  const unit = [
    ...new Set(courseMaterial?.course_info.map((elem) => elem.unit_tittle)),
  ];

  const lesson = [
    ...new Set(
      courseMaterial?.course_info.map((elem) => {
        return {
          unit_id: elem.unit_id,
          lesson_id: elem.lesson_id,
          lesson_title: elem.lesson_title,
        };
      })
    ),
  ];

  const lessonOrdered = lesson.sort((a, b) => a.lesson_id - b.lesson_id);

  const prueba = [];
  lessonOrdered.forEach((e) => {
    if (!prueba[e.unit_id]) {
      prueba[e.unit_id] = [e.lesson_title];
    } else {
      prueba[e.unit_id].push(e.lesson_title);
    }
  });
  const groupedArray = Object.values(prueba);

  console.log(groupedArray);
  return (
    <>
      {!courseMaterial && (
        <div className="coursesTableCard">
          <div className="cardTitle justify-content-center">
            <div className="titleStudent">
              <h3 className="titleText text-center text-warning">
                Bienvenido de vuelta {user.user_name}
              </h3>
            </div>
          </div>
          <div className="cardBody">
            <h6 className="text-center fst-italic">
              Vaya a mis cursos si quieres seguir con el progreso de estos
            </h6>
          </div>
        </div>
      )}
      {courseMaterial && (
        <div className="coursesTableCard">
          <div className="cardTitle">
            <div className="title">
              <div className="iconContainer">
                <GiClassicalKnowledge />
              </div>
              <h5 className="titleText">
                {courseMaterial && courseMaterial.course_name}
              </h5>
            </div>
          </div>
          <div className="cardBody">
            {unit &&
              unit.map((elem, idx) => {
                return (
                  <table className="coursesTableStudent mb-4">
                    <thead>
                      <tr key={idx} style={{ paddingTop: "10px" }}>
                        <th className="textReduce text-warning w-75">
                          <div className="oculto">{elem}</div>
                        </th>
                        <th className="text-warning text-center">Estado</th>
                        <th className="text-warning text-center">Recursos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedArray &&
                        groupedArray[idx].map((elem2) => {
                          console.log(elem2);
                          return (
                            <tr>
                              <td className="textReduce text-start w-75 ps-3">
                                <div className="oculto">{elem2}</div>
                              </td>
                              <td>
                                <AiFillEye />
                              </td>
                              <td className=" text-center">
                                <AiFillFile />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
