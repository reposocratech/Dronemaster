import React, { useContext, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { AiFillEye, AiFillFile } from "react-icons/ai";

export const StudentCourseTableInfo = () => {
  const { courseMaterial } = useContext(DroneMasterContext);

  return (
    <div className="coursesTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>
          <h5 className="titleText">{courseMaterial.course_name}</h5>
        </div>
      </div>
      <div className="cardBody">
        {courseMaterial.unit_tittle.map((elem) => {
          return (
            <table className="coursesTable">
              <thead>
                <tr key={elem.unit_id}>
                  <th className="textReduce text-warning w-75">
                    {elem.unit_tittle}
                  </th>
                  <th className="text-warning text-center">Estado</th>
                  <th className="text-warning text-center">Recursos</th>
                </tr>
              </thead>
              <tbody>
                {courseMaterial.lesson_title.map((elem) => {
                  return (
                    <tr key={elem.lesson_id}>
                      <td className="textReduce text-start w-75">
                        {elem.lesson_title}
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
  );
};
