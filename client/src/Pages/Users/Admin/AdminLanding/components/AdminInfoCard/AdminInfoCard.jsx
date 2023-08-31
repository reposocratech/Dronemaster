import React, { useContext } from "react";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineIdcard } from "react-icons/ai";

const AdminInfoCard = () => {
  const { user } = useContext(DroneMasterContext);

  return (
    <div className="adminInfoCard">
      <div className="cardTitle">
        <div className="iconContainer">
          <BiSolidUserDetail />
        </div>
        <div className="title">
          <h6 className="titleText">Mis Datos</h6>
        </div>
      </div>
      <div className="cardBody d-flex justify-content-evenly flex-column flex-xxl-row h-100">
        <div className="h-100 d-flex flex-column" >
          <div className="lineInfo">
            <span className="infoIcon">
              <HiOutlineMail />
            </span>
            <p>{user?.email}</p>
          </div>
          <div className="lineInfo">
            <span className="infoIcon">
              <FiMapPin />
            </span>
            <p>{user?.address ? user.address : "Contenido pendiente"}</p>
          </div>
        </div>

        <div className="h-100  d-flex flex-column" >
          <div className="lineInfo">
            <span className="infoIcon">
              <AiOutlinePhone />
            </span>
            <p>{user?.phone ? user.phone : "Contenido pendiente"} </p>
          </div>

          <div className="lineInfo">
            <span className="infoIcon">
              <AiOutlineIdcard />
            </span>
            <p>{user?.passport ? user.passport : "Contenido pendiente"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoCard;
