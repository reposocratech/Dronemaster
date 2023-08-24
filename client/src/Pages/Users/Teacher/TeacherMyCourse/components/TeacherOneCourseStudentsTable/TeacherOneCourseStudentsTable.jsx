import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";

export const TeacherOneCourseStudentsTable = ({ myOneCourseStudentsData , course_name}) => {
  const { register, handleSubmit, reset } = useForm();
  const [searchResultData, setSearchResultData] = useState();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setSearchResultData(
      myOneCourseStudentsData.filter((student) =>
        student.user_name
          .toLowerCase()
          .includes(data.studentSearch.toLowerCase())
      )
    );
    reset();
  };
  return (
    <div className="studentsTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Alumnos del curso</h5>
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
        <table className="coursesTable">
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

          
              <th className="text-center">Calificar</th>
            </tr>
          </thead>
          <tbody>
            {searchResultData ? (
              <>
                {searchResultData.length == 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {searchResultData?.map((student) => {
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
                                <span className="d-none d-md-inline ">
                                  {student.email}
                                </span>
                                <HiOutlineMail className="icon" />
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlinePhone className="icon" />
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
                {myOneCourseStudentsData?.map((student) => {
                  return (
                    <tr key={student.user_id}>
                      <td className="tdImg">
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
                        <div className="tableCell">{student.user_lastname}</div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon" />
                            <span className="d-none d-md-inline ">
                              {student.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon" />
                            <span className="d-none d-md-inline ">
                              {student.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                     
                      <td className=" buttonCell">
                        <div className="tableCell ">
                          <div className="tableCellContent inputCell">
                            {student.status != 1 ? (
                              <>
                                {student.status == 2 && (
                                  <select
                                    name="status"
                                    id="status"
                                    className="btnOutline2"
                                  >
                                    <option value="2">Completado</option>
                                    <option value="3">Suspenso</option>
                                    <option value="4">Aprovado</option>
                                  </select>
                                )}
                                {student.status == 3 && (
                                  <select
                                    name="status"
                                    id="status"
                                    className="btnOutline2"
                                  >
                                    <option value="3">Suspenso</option>
                                    <option value="4">Aprovado</option>
                                  </select>
                                )}
                                {student.status == 4 && (
                                  <select
                                    name="status"
                                    id="status"
                                    className="btnOutline2"
                                  >
                                    <option value="4">Aprovado</option>
                                    <option value="3">Suspenso</option>
                                  </select>
                                )}
                              </>
                            ) : (
                              <select
                                name="status"
                                id="status"
                                className="btnOutline2"
                                disabled
                              >
                                <option value="">En progreso</option>
                              </select>
                            )}
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
    </div>
  );
};
