const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class commonControllers {
  // 1.- Login
  // localhost:4000/login
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
      "SELECT (SELECT COUNT(*) FROM user WHERE type = 1 ) AS TotalTeachers,(SELECT COUNT(*) FROM user WHERE type = 0) AS TotalStudents, (SELECT COUNT(*) FROM course) AS TotalCourse;";

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 4.- Edit user info
  // localhost:4000/editMyProfile/:user_id
  editMyProfile = (req, res) => {
    const { user_id } = req.params;

    const { user_name, user_lastname, passport, address, phone } = JSON.parse(
      req.body.editUser
    );

    let img = "";

    let sql = `UPDATE user SET user_name = "${user_name}", user_lastname = "${user_lastname}", passport = "${passport}", address = "${address}",  phone = "${phone}"  WHERE user_id = "${user_id}"`;

    if (req.file != undefined) {
      img = req.file.filename;
      sql = `UPDATE user SET user_name = "${user_name}", user_lastname = "${user_lastname}", passport = "${passport}", address = "${address}",  phone = "${phone}", user_img = ${img}  WHERE user_id = "${user_id}"`;
    }

    connection.query(sql, (error, result) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result, img });
    });
  };

  // 5.- Add commentary
  // localhost:4000/addCommentary/:user_id/:course_id/:unit_id/:lesson_id
  addComentary = (req, res) => {
    const { user_id, course_id, unit_id, lesson_id } = req.params;
    const { comment_content } = req.body;

    let sql = `INSERT INTO comment (user_id, course_id, unit_id, lesson_id, comment_content) VALUES ("${user_id}", "${course_id}", "${unit_id}", "${lesson_id}", "${comment_content}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 6.- Response commentary
  // localhost:4000/responseCommentary/:user_id/:course_id/:unit_id/:lesson_id/:parent_comment_id
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
  // localhost:4000/myProfile/:user_id
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
  //localhost:4000/enableResource/:resource_id
  enableResources = (req, res) => {
    const { resource_id } = req.params;

    let sql = `UPDATE resource SET resource_is_hidden = 0 WHERE resource_id = "${resource_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //10.- Disable resources
  //localhost:4000/disableResource/:resource_id
  disableResources = (req, res) => {
    const { resource_id } = req.params;

    let sql = `UPDATE resource SET resource_is_hidden = 1 WHERE resource_id = "${resource_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new commonControllers();
