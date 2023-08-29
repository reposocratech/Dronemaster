import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const CommentsAndResponsesList = ({ allComments, user, course_id, unit_id, lesson_id }) => {
  const [responseInputForComment, setResponseInputForComment] = useState(null);
  const [responseContent, setResponseContent] = useState("");

  const { formState: { errors }, handleSubmit } = useForm();

  const originalComments = allComments?.filter(
    (comment) => comment.parent_comment_id === null
  );

  const displayedComments = new Set();

  const handleResponseInputChange = (e) => {
    setResponseContent(e.target.value);
  };

  const onSubmit = (commentId) => {
    axios
      .post(`http://localhost:4000/myCourse/myLesson/response/${course_id}/${unit_id}/${lesson_id}/${user.user_id}/${commentId}`, { responseContent })
      .then((res) => {
        console.log(res);
        setResponseInputForComment(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="commentsResponsesList">
      {originalComments?.map((comment) => {
        if (!displayedComments.has(comment.comment_id)) {
          displayedComments.add(comment.comment_id);

          return (
            <div className="commentCont" key={comment.comment_id}>
              <div className="commentTitle">
                <div className="userImgContainer">
                  {comment?.user_img ? (
                    <img src={`http://localhost:4000/images/users/${comment.user_img}`} />
                  ) : (
                    <h6 className="avatarText">
                      {comment.user_name.at(0).toUpperCase()}
                    </h6>
                  )}
                </div>
                <p className="mb-0 text-capitalize fw-light">
                  {comment.user_name} {comment.user_lastname}
                </p>
              </div>
              <p>{comment.comment_content}</p>
    
              <button
                className="responseButton"
                onClick={() => setResponseInputForComment(comment.comment_id)}
              >
                Responder
              </button>
    
              {responseInputForComment === comment.comment_id && (
                <div className="commentInputContainer">
                  <div className="userImgContainer">
                    {user.user_img ? (
                      <img src={`http://localhost:4000/images/users/${user.user_img}`} />
                    ) : (
                      <h6 className="avatarText">
                        {user.user_name.at(0).toUpperCase()}
                      </h6>
                    )}
                    <p className="mb-0 text-capitalize fw-light">
                      {user.user_name} {user.user_lastname}
                    </p>
                  </div>
    
                  <textarea
                    name="comment_content"
                    id="comment_content"
                    className="commentInput"
                    onChange={handleResponseInputChange}
                  ></textarea>
    
                  <div className="d-flex justify-content-between">
                    <button
                      className="commentButton"
                      onClick={() => setResponseInputForComment(null)}
                    >
                      Cancelar
                    </button>
    
                    <button
                      className="commentButton"
                      onClick={() => onSubmit(comment.comment_id)}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              )}
    
              {allComments
                ?.filter((response) => response.parent_comment_id === comment.comment_id)
                .map((response) => (
                  <div className="responseCont" key={response.comment_id}>
                    <div className="commentTitle">
                      <div className="userImgContainer">
                        {response.user_img ? (
                          <img src={`http://localhost:4000/images/users/${response.user_img}`} />
                        ) : (
                          <h6 className="avatarText">
                            {response.user_name.at(0).toUpperCase()}
                          </h6>
                        )}
                      </div>
                      <p className="mb-0 text-capitalize fw-light">
                        {response.user_name} {response.user_lastname}
                      </p>
                    </div>
                    <p>{response.comment_content}</p>
                  </div>
                ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
