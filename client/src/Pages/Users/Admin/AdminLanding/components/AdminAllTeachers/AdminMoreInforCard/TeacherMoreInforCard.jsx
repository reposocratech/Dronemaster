import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const TeacherMoreInforCard = ({
  setMoreInformationTeacher,
  moreInformationTeacher,
  teacher,
}) => {
  const [profileImg, setProfileImg] = useState();

  useEffect(() => {
    teacher &&
      setProfileImg(`http://localhost:4000/images/users/${teacher?.user_img}`);
  }, [teacher?.user_id]);

  const setTeacherEnable = () => {
    axios
      .put(`http://localhost:4000/admin/enableUser/${teacher?.user_id}`)
      .then((res) => {
        setMoreInformationTeacher(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setTeacherDisable = () => {
    axios
      .put(`http://localhost:4000/admin/disableUser/${teacher?.user_id}`)
      .then((res) => {
        setMoreInformationTeacher(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeInfoForm = () => {
    setMoreInformationTeacher(false);
  };
  return (
    <Modal
      show={moreInformationTeacher}
      onHide={closeInfoForm}
      className="courseCreationModalContainer"
      animation={false}
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          {/*           <div className="iconContainer">
              <GiClassicalKnowledge />
            </div> */}

          <h4 className="titleText">Informacion de Usuario</h4>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBody1">
        <div className="imgGridContainer">
          <div className="imgContainer">
            <img src={teacher?.user_img} alt="" />
          </div>
        </div>
        <p>
          {" "}
          Nombre Completo: {teacher?.user_name}
          {teacher?.user_lastname}
        </p>
        <p> Antonio {teacher?.email}</p>
        <p>Telefono {teacher?.phone}</p>
        <p> Dirección {teacher?.address}</p>
        <p>Estado: {teacher?.is_deleted === 0 ? "Activo" : "Inactivo"}</p>
      </Modal.Body>
      <Modal.Footer className="modalFooter">
        {teacher?.is_deleted === 0 ? (
          <button className="btnOutline1" onClick={setTeacherDisable}>
            Inhabilitar
          </button>
        ) : (
          <button className="btnOutline1" onClick={setTeacherEnable}>
            Habilitar
          </button>
        )}
        <button className="btnNormal" onClick={closeInfoForm}>
          Editar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeacherMoreInforCard;
