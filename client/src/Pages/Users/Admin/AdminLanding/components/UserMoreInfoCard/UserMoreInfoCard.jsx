import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const UserMoreInfoCard = ({
  setMoreInformationStudent,
  moreInformationStudent,
  student,
}) => {
  const [profileImg, setProfileImg] = useState();

  const closeInfoForm = () => {
    setMoreInformationStudent(false);
  };

  useEffect(() => {
    student &&
      setProfileImg(`http://localhost:4000/images/users/${student?.user_img}`);
  }, [student?.user_id]);

  const setStudentEnable = () => {
    axios
      .put(`http://localhost:4000/admin/enableUser/${student?.user_id}`)
      .then((res) => {
        setMoreInformationStudent(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setStudentDisable = () => {
    axios
      .put(`http://localhost:4000/admin/disableUser/${student?.user_id}`)
      .then((res) => {
        setMoreInformationStudent(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      show={moreInformationStudent}
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
            <img src={student?.user_img} alt="" />
          </div>
        </div>
        <p>
          {" "}
          Nombre Completo: {student?.user_name}
          {student?.user_lastname}
        </p>
        <p> Email {student?.email}</p>
        <p>Telefono {student?.phone}</p>
        <p> Dirección {student?.address}</p>
        <p>Estado: {student?.is_deleted === 0 ? "Activo" : "Inactivo"}</p>
      </Modal.Body>
      <Modal.Footer className="modalFooter">
        {student?.is_deleted === 0 ? (
          <button className="btnOutline1" onClick={setStudentDisable}>
            Inhabilitar
          </button>
        ) : (
          <button className="btnOutline1" onClick={setStudentEnable}>
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

export default UserMoreInfoCard;
