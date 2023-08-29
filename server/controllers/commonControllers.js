const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class commonControllers {
  // 1.- Login
  // http://localhost:4000/login

  login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM user WHERE email = "${email}"`;

    connection.query(sql, (error, result) => {
      // if query is failed

      if (error) return res.status(404).json(error);

      // if there isn´t an user with this email
      if (!result || !result.length || result[0].is_deleted == 1) {
        res.status(401).json("user is not registered");
      } else {
        // Correct email
        const [user] = result;
        const hash = user.password;

        // Password checking
        bcrypt.compare(password, hash, (error, response) => {
          if (error) return res.status(404).json(error);

          // Correct password
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  user_name: user.user_name,
                  user_id: user.user_id,
                  type: user.type,
                  user_img: user.user_img,
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token, user: result[0] });
          } // Incorrect password
          else {
            res.status(401).json("incorrect email or password");
          }
        });
      }
    });
  };

  //3.- Counter which includes total of teachers, courses and students
  //http://localhost:4000/counter
  viewCounter = (req, res) => {
    let sql =
      "SELECT (SELECT COUNT(*) FROM user WHERE type = 1 ) AS TotalTeachers,(SELECT COUNT(*) FROM user WHERE type = 0) AS TotalStudents, (SELECT COUNT(*) FROM user WHERE type = 2 ) AS TotalAdmin, (SELECT COUNT(*) FROM course) AS TotalCourse;";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 4.- Edit user info
  // http://localhost:4000/editMyProfile/:user_id
  editMyProfile = (req, res) => {
    const { user_id } = req.params;

    const { user_name, user_lastname, passport, address, phone } = JSON.parse(
      req.body.editedUser
    );
    console.log(user_id, "baaaaaaaaaaaaaaaaaaack");

    let img = "";

    let sql = `UPDATE user SET user_name = "${user_name}", user_lastname = "${user_lastname}", passport = "${passport}", address = "${address}",  phone = "${phone}"  WHERE user_id = ${user_id}`;

    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE user SET user_name = "${user_name}", user_lastname = "${user_lastname}", passport = "${passport}", address = "${address}",  phone = "${phone}", user_img = "${img}" WHERE user_id = ${user_id}`;
    }

    connection.query(sql, (error, result) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result, img });
    });
  };

  // 5.- Add commentary
  // http://localhost:4000/addCommentary/:user_id/:course_id/:unit_id/:lesson_id
  addComentary = (req, res) => {
    const { user_id, course_id, unit_id, lesson_id } = req.params;
    const { comment_content } = req.body;

    let sql = `INSERT INTO comment (user_id, course_id, unit_id, lesson_id, comment_content) VALUES ("${user_id}", "${course_id}", "${unit_id}", "${lesson_id}", "${comment_content}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 6.- Response commentary
  // http://localhost:4000/responseCommentary/:user_id/:course_id/:unit_id/:lesson_id/:parent_comment_id
  responseComentary = (req, res) => {
    const { user_id, course_id, unit_id, lesson_id, parent_comment_id } =
      req.params;
    const { comment_content } = req.body;

    let sql = `INSERT INTO comment (user_id, course_id, unit_id, lesson_id, parent_comment_id, comment_content) VALUES ("${user_id}", "${course_id}", "${unit_id}", "${lesson_id}", "${parent_comment_id}", "${comment_content}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 7.- Get student info
  // http://localhost:4000/myProfile/:user_id
  selectMyProfile = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT * FROM user WHERE user_id = "${user_id}" AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Show user course
  // localhost:4000showMyCourses/:user_id
  showMyCourses = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT course.* FROM (user_course, course) WHERE course.course_id = user_course.course_id AND user_course.user_id = "${user_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //9.- Enable resources
  //http://localhost:4000/enableResource/:resource_id
  enableResources = (req, res) => {
    const { resource_id } = req.params;

    let sql = `UPDATE resource SET resource_is_hidden = 0 WHERE resource_id = ${resource_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //10.- Disable resources
  //localhost:4000/disableResource/:resource_id
  disableResources = (req, res) => {
    const { resource_id } = req.params;

    let sql = `UPDATE resource SET resource_is_hidden = 1 WHERE resource_id = ${resource_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //9.- Enable lessons
  //http://localhost:4000/enableLessons/:lesson_id
  enableLessons = (req, res) => {
    const { lesson_id } = req.params;

    let sql = `UPDATE lesson SET lesson_is_hidden = 0 WHERE lesson_id = ${lesson_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //10.- Disable lessons
  //localhost:4000/disableLessons/:lesson_id
  disableLessons = (req, res) => {
    const { lesson_id } = req.params;

    let sql = `UPDATE lesson SET lesson_is_hidden = 1 WHERE lesson_id = ${lesson_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 11.- Get 4 top courses (
  // http://localhost:4000/topCourses
  selectTopCourses = (req, res) => {
    let sql = "SELECT * FROM course ORDER BY course_id DESC LIMIT 4";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 12.- Get 4 best rated (
  // http://localhost:4000/bestRatedCourses
  selectBestRatedCourses = (req, res) => {
    let sql = "SELECT * FROM course ORDER BY score DESC LIMIT 4";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 13.- Delete profile image of a user
  // http://localhost:4000/myProfile/deleteImage/:user_id
  deleteProfileImage = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET user_img = NULL WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 14.- Download exam
  // http://localhost:4000/downloadExam/:course_id
  downloadExam = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT exam_file FROM course WHERE course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 15.- Gets info from a user at user_course
  // http://localhost:4000/myProfile/myCourse/:user_id/:course_id
  getUserCourseInfo = (req, res) => {
    const { user_id, course_id } = req.params;

    let sql = `SELECT * FROM user_course WHERE user_id = ${user_id} AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };


  // 16.- Gets original comments and responses of a lesson
  // http://localhost:4000/myCourse/myLesson/comments/:course_id/unit_id/:lesson_id
  getAllComments = (req, res) => {
    const { unit_id, course_id, lesson_id } = req.params;

    let sql = `SELECT comment.comment_id, comment.comment_content, comment.user_id, user.user_name, user.user_lastname, user.user_img, comment.parent_comment_id, response.comment_id AS response_comment_id, response.comment_content AS response_comment_content, response.user_id AS response_comment_user_id FROM comment LEFT JOIN comment AS response ON comment.comment_id = response.parent_comment_id LEFT JOIN user ON comment.user_id = user.user_id WHERE comment.course_id = ${course_id} AND comment.unit_id = ${unit_id} AND comment.lesson_id = ${lesson_id}`;

     connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
  
  // 17 Get resource name to download resource
  // http://localhost:4000/resourceName/:lesson_id
  getResourceName = (req, res) => {
    const { lesson_id } = req.params;

    let sql = `SELECT resource_name FROM resource JOIN lesson ON lesson.resource_id = resource.resource_id WHERE lesson_id = ${lesson_id}`;


    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };


  // 18- Post a new response to a comment
  // http://localhost:4000/myCourse/myLesson/response/:course_id/:unit_id/:lesson_id/:user_id/:comment_id
  setResponseComment = (req, res) => {
    const { unit_id, course_id, lesson_id, user_id, comment_id } = req.params;

    const { responseContent  } = req.body;
  
    let sql = `INSERT INTO comment (user_id, course_id, unit_id, lesson_id, parent_comment_id, comment_content) VALUES (${user_id},${course_id}, ${unit_id}, ${lesson_id}, ${comment_id},"${responseContent}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

  // 19- Upload resource into a lesson
  // http://localhost:4000/uploadResource/:user_id/:course_id/:unit_id/:lesson_id
  uploadResource = (req, res) => {
    const { user_id } = req.params;
    let file = req.file.filename;
    console.log(file);

    let sql = `INSERT INTO resource (user_id, resource_name) VALUES (${user_id}, "${file}")`;
  connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

  // 20et the information of one User
  // http://localhost:4000/userInformation/:user_id
  viewOneUserInfo = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT user_img, user_name, user_lastname, email, phone, address, is_deleted FROM user WHERE user_id = ${user_id}`;


    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new commonControllers();
