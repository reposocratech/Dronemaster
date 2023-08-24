import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Container } from "react-bootstrap";

const AdminAllStudentsCard = () => {
  const [students, setStudents] = useState();

  const { user } = useContext(DroneMasterContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/allStudents")
      .then((res) => {
        setStudents(res.data);
        console.log(students);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="studentsTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Todos los Alumnos</h5>
        </div>
      </div>

      {students?.map((student) => {
        return (
          <tr key={student?.user_id}>
            {/*  <td className="tdImg">
              <div className="tableImg">
                {student?.student_img ? (
                  <img
                    src={`http://localhost:4000/images/user/${student.student_img}`}
                  />
                ) : (
                  <h6 className="avatarText">
                    {student?.student_name.at(0).toUpperCase()}
                  </h6>
                )}
              </div>
            </td> */}
            <td className="tableCellName">{student?.user_name}</td>
            <td>
              <div className="tableCell">{student?.user_lastname}</div>
            </td>
            <td>
              <div className="tableCell iconCell">
                <div className="tableCellContent">
                  <HiOutlineMail className="icon" />
                  <span className="d-none d-md-inline ">{student?.email}</span>
                </div>
              </div>
            </td>
            <td>
              <div className="tableCell iconCell">
                <div className="tableCellContent">
                  <AiOutlinePhone className="icon" />
                  <span className="d-none d-md-inline ">{student?.phone}</span>
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </Container>
  );
};

export default AdminAllStudentsCard;
