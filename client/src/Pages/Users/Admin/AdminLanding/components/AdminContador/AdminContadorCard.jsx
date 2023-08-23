import axios from "axios";
import React, { useEffect, useState } from "react";

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
    <div>
      <h6>Contador</h6>
      <span>Profesores</span>
      <p>{counter.TotalTeachers}</p>
      <span>Alumnos</span>
      <p>{counter.TotalStudents}</p>
      <span>Cursos</span>
      <p>{counter.TotalCourse}</p>
    </div>
  );
};

export default AdminContadorCard;
