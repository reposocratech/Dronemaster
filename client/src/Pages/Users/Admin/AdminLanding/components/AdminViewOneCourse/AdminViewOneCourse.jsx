import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {
  BsFillFileEarmarkArrowDownFill,
  BsFillFileArrowUpFill,
  BsFillFileEarmarkExcelFill,
} from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
const AdminViewOneCourse = ({ course_id }) => {
  const [allInformation, setAllInformation] = useState();
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  console.log("333333333333333333333333333333", course_id);
  /* console.log("todos los cursooooooos", allCourses); */
  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setAllInformation(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [course_id]);
  console.log("*********************************", allInformation);

  const uniqueUnitNames = Array.from(
    new Set(allInformation?.map((item) => item.unit_tittle))
  );
  console.log(uniqueUnitNames);
  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [allInformation]);
  console.log("1111111111111111111111111111111111111", course_id);
  console.log("2222222222222222222222222222222", allInformation);
  //DROPDOWN
  const closedHeight = "0px";
  const openedHeight = "35px";
  const toggleUnit = (unitIndex) => {
    if (openUnits.includes(unitIndex)) {
      // Si el índice ya está en el array, lo eliminamos
      setOpenUnits(openUnits.filter((index) => index !== unitIndex));
    } else {
      // Si el índice no está en el array, lo agregamos
      setOpenUnits([...openUnits, unitIndex]);
    }
  };
  return (
    <tr className="coursesTableCard mb-4">
      {unitsName.map((unitName, unitIndex) => (
        <div key={unitIndex}>
          <td className="d-flex me-4">
            <h6>
              Unidad {unitIndex + 1}: {unitName}
            </h6>
            <div className="resourceContainer ">
              <BsPencil className="icon  text-warning" />
              <BsEye className="icon  text-warning" />
              <BsEyeSlash className="icon  text-warning" />
            </div>
          </td>
          <tr>
            {allInformation
              .filter((item) => item.unit_tittle === unitName)
              .map((lesson) => (
                <td className="d-flex me-4">
                  <h6>{lesson.lesson_title}</h6>
                  <div className="resourceContainer ">
                    <BsPencil className="icon  text-warning" />
                    <BsEye className="icon  text-warning" />
                    <BsEyeSlash className="icon  text-warning" />
                  </div>
                </td>
              ))}

            <div>
              {allInformation
                .filter((item) => item.unit_tittle === unitName)
                .map((resource) => (
                  <tr className="coursesTableCard mb-4">
                    <div> Recurso: {resource.resource_id}</div>
                    <div className="resourceContainer"></div>
                  </tr>
                ))}
            </div>
          </tr>
        </div>
      ))}
    </tr>
  );
};
export default AdminViewOneCourse;
