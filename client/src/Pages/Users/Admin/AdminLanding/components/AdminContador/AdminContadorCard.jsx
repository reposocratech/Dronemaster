import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBook } from "react-icons/bs";

const initialUserCounter = {
  TotalTeachers: 0,
  TotalStudents: 0,
  TotalCourse: 0,
};

const AdminContadorCard = () => {
  const [counter, setCounter] = useState(initialUserCounter);

  useEffect(() => {
    axios
      .get("http://localhost:4000/counter")
      .then((res) => {
        setCounter(res.data[0]);
        console.log(counter);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="counterCard">
      <div className="cardBody d-flex justify-content-center align-content-center">
        <div className="counterCard">
          <span className="iconContainer">
            <AiOutlineUser />
          </span>
          <h6>Profesores</h6>
          <p>{counter.TotalTeachers}</p>
        </div>
        <div className="counterCard">
          <span className="iconContainer">
            <AiOutlineUser />
          </span>
          <h6>Profesores</h6>
          <p>{counter.TotalTeachers}</p>
        </div>
        <div className="counterCard">
          <span className="iconContainer">
            <AiOutlineUser />
          </span>
          <div className="textContianer">
            <h6 className="title">Alumnos</h6>
            <p>{counter.TotalStudents}</p>
          </div>
        </div>
        <div className="counterCard">
          <span className="iconContainer">
            <BsBook />
          </span>
          <div className="textContianer">
            <h6 className="title">Cursos</h6>
            <p>{counter.TotalCourse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContadorCard;
