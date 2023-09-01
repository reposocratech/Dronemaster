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
  setUser,
  user,
}) => {
  const [teachers, setTeachers] = useState();
  const { register, handleSubmit, reset } = useForm();
  const [oneTeacher, setOneTeacher] = useState();
  const [searchResultData, setSearchResultData] = useState();

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

  console.log("TEACHERS", teachers);

  // Buscador
  const onSubmit = (data) => {
    console.log("DATAAAAAAAAA", data);
    setSearchResultData(
      teachers?.filter((teacher) =>
        teacher.user_name
          .toLowerCase()
          .includes(data.teacherSearch.toLowerCase())
      )
    );
    console.log("searchResultDataaaaaaa", data.teacherSearch);
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
      </div>
      <div>
        {" "}
        {searchResultData && (
          <button
            onClick={() => setSearchResultData()}
            className="btnOutline1 m-3"
          >
            Ver todos
          </button>
        )}
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
            {searchResultData ? (
              <>
                {searchResultData?.length === 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {searchResultData?.map((teacher) => {
                      return (
                        <tr key={teacher?.user_id}>
                          <td>
                            <div >
                              {teacher?.user_img ? (
                                <img
                                  src={`http://localhost:4000/images/user/${teacher?.user_img}`}
                                />
                              ) : (
                                <h6 className="avatarTextUser">
                                  {teacher?.user_name.at(0).toUpperCase()}
                                </h6>
                              )}
                            </div>
                          </td>
                          <td className="tableCellName">
                            {teacher?.user_name}
                          </td>
                          <td>
                            <div className="tableCell">
                              {teacher?.user_lastname}
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <HiOutlineMail className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {teacher?.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlinePhone className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {teacher?.phone}
                                </span>
                              </div>
                            </div>
                          </td>
                          <div className="tableCell iconCell">
                            <div className="tableCellContent">
                              <button
                                onClick={() => openTeacherForm(teacher.user_id)}
                                className="btnOutline1"
                                style={{ marginTop : "10px"}}
                              >
                               Info
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
                    <tr key={teacher?.user_id}>
                      <td>
                        <div>
                          {teacher?.teacher_img ? (
                            <img
                              src={`http://localhost:4000/images/user/${teacher.user_img}`}
                            />
                          ) : (
                            <h6 className="avatarTextUser">
                              {teacher?.user_name.at(0).toUpperCase()}
                            </h6>
                          )}
                        </div>
                      </td>
                      <td className="tableCellName">{teacher?.user_name}</td>
                      <td>
                        <div className="tableCell">
                          {teacher?.user_lastname}
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {teacher?.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {teacher?.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <div className="tableCell iconCell">
                        <div className="tableCellContent">
                          <button
                            onClick={() => openTeacherForm(teacher.user_id)}
                            className="btnOutline1"
                            style={{ marginTop : "10px"}}
                          >
                            Info
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllTeachersCard;
