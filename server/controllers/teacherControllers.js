const connection = require("../config/db");

class teacherControllers {
  // 1.- Get all students (not deleted) of a teacher
  // http://localhost:4000/teachers/myStudents/:user_i
  selectMyStudents = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT DISTINCT user.user_id AS student_id, user.user_name AS student_name, user.user_lastname AS student_lastname, user.email AS student_email,user.phone AS student_phone, user.user_img AS student_img FROM user JOIN user_course ON user.user_id = user_course.user_id WHERE user.type = 0 AND user.is_deleted = 0 AND user_course.course_id IN (SELECT course_id FROM user_course WHERE user_id = ${user_id})`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 2.- Count all students (not deleted) of a course
  // http://localhost:4000/teachers/myCourses/studentCounter/:user_id
  countMyStudentsFromCourse = (req, res) => {
    const { user_id } = req.params;

    let sql = `SELECT user_course.course_id, COUNT(DISTINCT user_course.user_id) AS num_students, COUNT(DISTINCT unit.unit_id) AS num_units FROM user_course JOIN user ON user_course.user_id = user.user_id JOIN unit ON user_course.course_id = unit.course_id WHERE user.type = 0 AND user.is_deleted = FALSE AND user_course.course_id IN ( SELECT course_id FROM user_course WHERE user_id = ${user_id} ) GROUP BY user_course.course_id;`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 3.- Select all students (not deleted and type 0), user_starting date and user status (STATS) of a course
  // http://localhost:4000/teachers/myCourses/students/:course_id
  selectMyStudentsFromCourse = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT user.user_id, user.user_name, user.user_lastname, user.phone, user.email, user_course.status, user_course.start_date FROM user INNER JOIN user_course ON user.user_id = user_course.user_id WHERE user.type = 0 AND user.is_deleted = 0 AND user_course.course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  // 4.- Select all units, lessons and resource from a course
  // http://localhost:4000/teachers/myCourses/courseInfo/:course_id
  selectMyCourseInfo = (req, res) => {
    const { course_id } = req.params;

    let sql = `SELECT course.score AS course_score, course.course_id, unit.unit_id, lesson.lesson_id, resource.resource_id, course.course_name, unit.unit_tittle, lesson.lesson_title FROM course INNER JOIN unit ON course.course_id = unit.course_id INNER JOIN lesson ON unit.course_id = lesson.course_id AND unit.unit_id = lesson.unit_id LEFT JOIN resource ON lesson.resource_id = resource.resource_id WHERE course.course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 5.- Select all inscription Dates of a course
  // http://localhost:4000/teachers/myCourses/inscriptionDates/:course_id
  selectMyCourseInsciptions = (req, res) => {
    const { course_id } = req.params;
    console.log("paraaaaaaaaaaaaaaaaaaaaaaaaaaaaams", course_id);

    let sql = `SELECT start_date FROM user_course WHERE user_id IN ( SELECT user_id FROM user WHERE type = 0 ) AND course_id = ${course_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new teacherControllers();
