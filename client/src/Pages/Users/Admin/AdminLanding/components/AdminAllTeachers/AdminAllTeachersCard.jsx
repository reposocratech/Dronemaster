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
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";

const AdminAllTeachersCard = () => {
  const [teachers, setTeachers] = useState();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(DroneMasterContext);
  const navigate = useNavigate();
  const [searchResultData, setSearchResultData] = useState();

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/allTeachers")
      .then((res) => {
        setTeachers(res.data);
        console.log(teachers);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (data) => {
    setSearchResultData(
      teachers.filter((teacher) =>
        teacher.user_name
          .toLowerCase()
          .includes(data.teacherSearch.toLowerCase())
      )
    );
    reset();
  };

  return (
    <div className="adminTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Todos los Profesores</h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="searchBar">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar Profesor..."
              {...register("teacherSearch")}
            />
          </div>
        </form>
        <button className="btnOutline1"> Añadir Profesor</button>
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
            {teachers ? (
              <>
                {teachers.length == 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {teachers?.map((teacher) => {
                      return (
                        <tr key={teacher.user_id}>
                          <td>
                            <div className="tableImg">
                              {teacher?.user_img ? (
                                <img
                                  src={`http://localhost:4000/images/user/${teacher.user_img}`}
                                />
                              ) : (
                                <h6 className="avatarText">
                                  {teacher?.user_name.at(0).toUpperCase()}
                                </h6>
                              )}
                            </div>
                          </td>
                          <td className="tableCellName">{teacher.user_name}</td>
                          <td>
                            <div className="tableCell">
                              {teacher.user_lastname}
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <HiOutlineMail className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {teacher.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlinePhone className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {teacher.phone}
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
                {teachers?.map((teacher) => {
                  return (
                    <tr key={teacher.user_id}>
                      <td className="tdImg">
                        <div className="tableImg">
                          {teacher?.teacher_img ? (
                            <img
                              src={`http://localhost:4000/images/user/${teacher.user_img}`}
                            />
                          ) : (
                            <h6 className="avatarText">
                              {teacher?.user_name.at(0).toUpperCase()}
                            </h6>
                          )}
                        </div>
                      </td>
                      <td className="tableCellName">{teacher.user_name}</td>
                      <td>
                        <div className="tableCell">{teacher.user_lastname}</div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {teacher.user_email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {teacher.phone}
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
    </div>
  );
};

export default AdminAllTeachersCard;
