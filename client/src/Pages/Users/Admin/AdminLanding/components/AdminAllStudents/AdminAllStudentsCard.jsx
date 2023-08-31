import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { Container } from "react-bootstrap";
import UserMoreInfoCard from "../UserMoreInfoCard/userMoreInfoCard";

const AdminAllStudentsCard = ({
  setMoreInformationStudent,
  moreInformationStudent,
}) => {
  const [students, setStudents] = useState([]);
  const { register, handleSubmit } = useForm();
  const [oneStudent, setOneStudent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/allStudents")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => console.log(err));
  }, [moreInformationStudent]);

  const openInfoForm = (userId) => {
    axios
      .get(`http://localhost:4000/userInformation/${userId}`)
      .then((res) => {
        setOneStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
    setMoreInformationStudent(true);
  };

  const onSubmit = (data) => {
    console.log("Dataaaaa", data);
    const name = data.studentSearch;

    console.log(name);

    if (!name) {
      setOneStudent(null);
    } else {
      const studentFound = students.filter((elem) =>
        elem.user_name.toLowerCase().includes(name.toLowerCase())
      );
      setOneStudent(studentFound.length > 0 ? studentFound[0] : null);
    }

    console.log("oneStudent", oneStudent);
    console.log("studentFound", studentFound);
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
              <th className="iconHeadName">
                <span className=" d-none d-md-flex">Información</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!oneStudent ? (
              <tr>
                <td colSpan={6}>Sin resultados de búsqueda</td>
              </tr>
            ) : (
              studentFound?.map((student) => (
                <tr key={student?.user_id}>
                  <td>
                    <div className="tableImg">
                      {student?.user_img ? (
                        <img
                          src={`http://localhost:4000/images/user/${student?.user_img}`}
                        />
                      ) : (
                        <h6 className="avatarText">
                          {student.user_name.at(0).toUpperCase()}
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
                  <td>
                    <div className="tableCell iconCell">
                      <div className="tableCellContent">
                        <button
                          onClick={() => openInfoForm(student?.user_id)}
                          className="btnOutline1"
                        >
                          Ver más
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {oneStudent && (
          <UserMoreInfoCard
            moreInformationStudent={moreInformationStudent}
            setMoreInformationStudent={setMoreInformationStudent}
            student={oneStudent}
          />
        )}
      </div>
    </Container>
  );
};

export default AdminAllStudentsCard;
