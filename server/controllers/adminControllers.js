const connection = require("../config/db");

class adminControllers {
  // 1.- Create teacher
  // http://localhost:4000/admin/createTeacher
  createTeacherOrAdmin = (req, res) => {
    const { user_name, user_lastname, email, password, type } = req.body;

    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        err && res.status(401).json({ err });

        let sql = `INSERT INTO user (user_name, user_lastname, email, password, type, national_id, address, phone, user_img) VALUES ('${user_name}', '${user_lastname}', '${email}', '${hash}', '${type}')`;

        connection.query(sql, (error, result) => {
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };

  // 2.- View all teachers
  // http://localhost:4000/admin/allTeachers
  selectAllTeachers = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 1 AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 3.- View all students
  // http://localhost:4000/admin/allStudents
  selectAllStudents = (req, res) => {
    let sql = `SELECT * FROM user WHERE type = 0 AND is_deleted = 0`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 4.- Enable comment
  // http://localhost:4000/admin/enableComment
  enableComment = (req, res) => {
    const { comment_id } = req.params;
    const { type } = req.body;

    if (type !== 2) {
      res.status(403).json({ error });
    } else {
      let updateSql = `UPDATE comment SET comment_is_hidden = 0 WHERE comment_id = ${comment_id}`;

      connection.query(updateSql, (error, result) => {
        error ? res.status(400).json({ error }) : res.status(201).json(result);
      });
    }
  };

  // 5.- Disable comment
  // http://localhost:4000/admin/disableComment
  disableComment = (req, res) => {
    const { comment_id } = req.params;
    const { type } = req.body;

    if (type !== 2) {
      res.status(403).json({ error });
    } else {
      let sql = `UPDATE comment SET comment_is_hidden = 1 WHERE comment_id = ${comment_id}`;

      connection.query(sql, (error, result) => {
        error ? res.status(400).json({ error }) : res.status(200).json(result);
      });
    }
  };

  // 6.- Enable User
  // http://localhost:4000/admin/enableUser/:user_id
  enableUser = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${user_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 7.- Disable User
  // http://localhost:4000/admin/disableUser/:user_id
  disableUser = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${user_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 8.- Passed course
  // localhost:4000/admin/passedCourse/:user_id
  passedCourse = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user_course SET status = 4 WHERE user_id = "${user_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 9.- Not passed course
  // localhost:4000/admin/notPassedCourse/:user_id
  notPassedCourse = (req, res) => {
    const { user_id } = req.params;

    let sql = `UPDATE user_course SET status = 3 WHERE user_id = "${user_id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 10.- Get All Courses (admin)
  // http://localhost:4000/admin/getAllCourses
  viewAllCourses = (req, res) => {
    let sql = "SELECT * FROM course";
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new adminControllers();
