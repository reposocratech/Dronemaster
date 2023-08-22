const connection = require("../config/db");

class teacherControllers {
  selectMySturdents = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT DISTINCT user.user_id AS student_id, user.user_name AS student_name, user.user_lastname AS student_lastname, user.email AS student_email,user.phone AS student_phone, user.user_img AS student_img FROM user JOIN user_course ON user.user_id = user_course.user_id WHERE user.type = 0 AND user.is_deleted = 0 AND user_course.course_id IN (SELECT course_id FROM user_course WHERE user_id = ${user_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  countMySturdentsFromCourse = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT user_course.course_id, COUNT(DISTINCT user_course.user_id) AS num_students, COUNT(DISTINCT unit.unit_id) AS num_units FROM user_course JOIN user ON user_course.user_id = user.user_id JOIN unit ON user_course.course_id = unit.course_id WHERE user.type = 0 AND user.is_deleted = FALSE AND user_course.course_id IN ( SELECT course_id FROM user_course WHERE user_id = ${user_id} ) GROUP BY user_course.course_id;`

    connection.query(sql,  (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    })
  }
}

module.exports = new teacherControllers();
