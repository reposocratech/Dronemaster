import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoCommentDiscussion } from "react-icons/go";
import { CommentsAndResponsesList } from "./CommentsAndResponsesList";

export const LessonComments = ({ user, course_id, unit_id, lesson_id }) => {
  const [allComments, setAllComments] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/myCourse/myLesson/comments/${course_id}/${unit_id}/${lesson_id}`
      )
      .then((res) => {
        console.log(res.data, "All comments");
        setAllComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lesson_id, unit_id, course_id]);

  const onSubmit = (data) => {
    axios
      .post(
        `http://localhost:4000/addCommentary/${user.user_id}/${course_id}/${unit_id}/${lesson_id}`,
        data
      )
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div className="commentsCard">
      {/* Card title */}
      <div className="cardTitle">
        <div className="iconContainer">
          <GoCommentDiscussion />
        </div>
        <h6 className="mb-0">Comentarios</h6>
      </div>
      {/* Card Body */}
      <div className="commentCardBody">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="commentInputContainer">
            <div className="userImgContainer">
              <img
                src={
                  user?.user_img &&
                  `http://localhost:4000/images/users/${user?.user_img}`
                }
              />
              <p className="mb-0">
                {user?.user_name} {user?.user_lastname}
              </p>
            </div>
            <textarea
              {...register("comment_content", {
                required: "Debes escriber algún comentario",
                minLength: { value: 3, message: "Minimo de 2 letras" },
                maxLength: { value: 100, message: "Maximo 250 caracteres" },
              })}
              id="comment_content"
              className="commentInput"
            ></textarea>
            <div className="buttonContainer">
              <label htmlFor="comment_content">Escribe un comentario...</label>
              <button className="commentButton" type="submit">
                Enviar
              </button>
            </div>
          </div>
        </form>

        <CommentsAndResponsesList
          course_id={course_id}
          unit_id={unit_id}
          lesson_id={lesson_id}
          allComments={allComments}
          user={user}
        />
      </div>
    </div>
  );
};
