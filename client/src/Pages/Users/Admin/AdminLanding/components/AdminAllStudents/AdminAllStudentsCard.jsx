import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

const AdminAllStudentsCard = () => {
  const [students, setStudents] = useState();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(DroneMasterContext);
  const navigate = useNavigate();
  const [searchResultData, setSearchResultData] = useState();

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/allStudents")
      .then((res) => {
        setStudents(res.data);
        /* console.log(students); */
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setSearchResultData(
      students.filter((student) =>
        student.user_name
          .toLowerCase()
          .includes(data.studentSearch.toLowerCase())
      )
    );
    reset();
  };

  return (
    <Container className="adminTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Todos los Alumnos</h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="searchBar">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar alumno..."
              {...register("studentSearch")}
            />
          </div>
        </form>
      </div>
      <div className="cardBody">
        <table className="adTable">
          <thead>
            <tr>
              <th colSpan={2}>Nombre</th>
              <th>Primer Apellido</th>
              <th className="iconHeadName">
                {" "}
                <HiOutlineMail className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex">Email</span>
              </th>
              <th className="iconHeadName">
                <AiOutlinePhone className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex">Telefono</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students ? (
              <>
                {students.length == 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {students?.map((student) => {
                      return (
                        <tr key={student.user_id}>
                          <td>
                            <div className="tableImg">
                              {student?.user_img ? (
                                <img
                                  src={`http://localhost:4000/images/user/${student.user_img}`}
                                />
                              ) : (
                                <h6 className="avatarText">
                                  {student?.user_name.at(0).toUpperCase()}
                                </h6>
                              )}
                            </div>
                          </td>
                          <td className="tableCellName">{student.user_name}</td>
                          <td>
                            <div className="tableCell">
                              {student.user_lastname}
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <HiOutlineMail className="icon text-warning" />
                                <span className="d-none d-md-inline ">
                                  {student.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlinePhone className="icon text-warning" />
                                <span className="d-none d-md-inline ">
                                  {student.phone}
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                {students?.map((student) => {
                  return (
                    <tr key={student.user_id}>
                      <td className="tdImg">
                        <div className="tableImg">
                          {student?.student_img ? (
                            <img
                              src={`http://localhost:4000/images/user/${student.user_img}`}
                            />
                          ) : (
                            <h6 className="avatarText">
                              {student?.user_name.at(0).toUpperCase()}
                            </h6>
                          )}
                        </div>
                      </td>
                      <td className="tableCellName">{student.user_name}</td>
                      <td>
                        <div className="tableCell">{student.user_lastname}</div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon" />
                            <span className="d-none d-md-inline ">
                              {student.user_email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon" />
                            <span className="d-none d-md-inline ">
                              {student.user_phone}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default AdminAllStudentsCard;
