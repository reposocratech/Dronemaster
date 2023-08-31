import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import TeacherMoreInforCard from "./AdminMoreInforCard/TeacherMoreInforCard";

const AdminAllTeachersCard = ({
  setMoreInformationTeacher,
  moreInformationTeacher,
}) => {
  const [teachers, setTeachers] = useState();
  const { register, handleSubmit } = useForm();
  const [oneTeacher, setOneTeacher] = useState();

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/allTeachers")
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const openTeacherForm = (userId) => {
    axios
      .get(`http://localhost:4000/userInformation/${userId}`)
      .then((res) => {
        setOneTeacher(res.data[0]);
      })
      .catch((err) => console.log(err));
    setMoreInformationTeacher(true);
  };

  // Buscador
  const onSubmit = () => {
    setMoreInformationTeacher(true);
    useEffect(() => {
      axios
        .get(`http://localhost:4000/userInformation/${teachers.user_id}`)
        .then((res) => {
          setOneStudent(res.data);
        })
        .catch((err) => console.log(err));
    }, [user]);
  };

  return (
    <div className="allTeachersCard">
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
                <th className="iconHeadName">
                  <span className=" d-none d-md-flex">Información</span>
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
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <button
                                  onClick={() => openTeacherForm(teacher.user_id)}
                                  className="btnOutline1"
                                >
                                  Ver más
                                </button>
                              </div>
                            </div>
                          </tr>
                        );
                      })}
                    </>
                  )}
                  <TeacherMoreInforCard
                    moreInformationTeacher={moreInformationTeacher}
                    setMoreInformationTeacher={setMoreInformationTeacher}
                    teacher={oneTeacher}
                  />
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
                                {teacher.email}
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
              <TeacherMoreInforCard
                moreInformationTeacher={moreInformationTeacher}
                setMoreInformationTeacher={setMoreInformationTeacher}
                teacher={oneTeacher}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAllTeachersCard;
