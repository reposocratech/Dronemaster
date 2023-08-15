const connection = require("../config/db");

class studentControllers {
  // 1.- Get student info
  // localhost:4000/students/oneStudent/:id
  selectOneStudent = (req, res) => {
    console.log("req params: ", req.params);
    let { id } = req.params;

    let sqlStudent = `SELECT * FROM user WHERE user_id = "${id}" AND is_deleted = 0`;

    let sqlCourse = `SELECT * FROM course WHERE created_by_user_id = "${id}" AND course_is_hidden = 0`;

    connection.query(sqlStudent, (error1, studentResult) => {
      if (error1) {
        res.status(400).json({ error1 });
      }

      connection.query(sqlCourse, (error2, courseResult) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ studentResult, courseResult });
      });
    });
  };
}

module.exports = new studentControllers();
