import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const TeacherCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="teacherCard">
      <div className="imgContainer">
        {user?.img ? (
          <img src={`http://localhost:4000/images/user/${user.img}`} />
        ) : (
          <h2 className="avatarText">{user?.user_name.at(0).toUpperCase()}</h2>
        )}
      </div>
      <div className="textContainer">
        <h6 className="name">
          {user?.user_name} {user?.user_lastname}
        </h6>
        <p>
          {user?.type == 1 && "Profesor"}
          {user?.type == 2 && "Admin"}
        </p>
      </div>
      <div className="editionButton">
        <div
          className="iconButton"
          onClick={() => navigate(`/user/editMyProfile/${user?.user_id}`)}
        >
          <FaEdit />
        </div>
      </div>
    </div>
  );
};
