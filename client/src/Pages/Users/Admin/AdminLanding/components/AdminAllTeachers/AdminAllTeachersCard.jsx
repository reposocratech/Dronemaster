import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

const AdminAllTeachersCard = () => {
  const [teachers, setTeachers] = useState();

  const { user } = useContext(DroneMasterContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/allTeachers")
      .then((res) => {
        setTeachers(res.data);
        console.log(teachers);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="adminTableCard">
      <div className="cardTitle">
        <div className="titleAdmin">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Todos los Profesores</h5>
        </div>
      </div>

      {teachers?.map((teacher) => {
        return (
          <tr className="cardBody" key={teacher?.user_id}>
            <div className="adTable">
              <td className="tdImg">
                <div className="tableImg">
                  {teacher?.user_img ? (
                    <img
                      src={`http://localhost:4000/images/user/${teacher?.user_img}`}
                    />
                  ) : (
                    <h6 className="avatarText">
                      {teacher?.user_name.at(0).toUpperCase()}
                    </h6>
                  )}
                </div>
              </td>
              <td className="tableCellName">{teacher?.user_name}</td>
              <td>
                <div className="tableCell">{teacher?.user_lastname}</div>
              </td>
              <td>
                <div className="tableCell iconCell">
                  <div className="tableCellContent">
                    <HiOutlineMail className="icon" />
                    <span className="d-none d-md-inline ">
                      {teacher?.email}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="tableCell iconCell">
                  <div className="tableCellContent">
                    <AiOutlinePhone className="icon" />
                    <span className="d-none d-md-inline ">
                      {teacher?.phone}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div className="tableCell iconCell">
                  <div className="tableCellContent">
                    <BsPencil className="icon" />
                    {/* <span className="d-none d-md-inline ">Editar</span> */}
                  </div>
                </div>
              </td>
              <td>
                <div className="tableCell iconCell">
                  <div className="tableCellContent">
                    <BsEye className="icon" />
                    {/* <span className="d-none d-md-inline ">Habilitar</span> */}
                  </div>
                </div>
              </td>
              <td>
                <div className="tableCell iconCell">
                  <div className="tableCellContent">
                    <BsEyeSlash className="icon" />
                    {/* <span className="d-none d-md-inline ">Deshabilitar</span> */}
                  </div>
                </div>
              </td>
            </div>
          </tr>
        );
      })}
    </Container>
  );
};

export default AdminAllTeachersCard;
