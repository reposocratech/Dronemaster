const connection = require("../config/db");

class teacherControllers {
  // 1.- Show teacher course (profile)
  // localhost:4000/teachers/oneTeacher/showCourses/:id
  showCourses = (req, res) => {
    console.log("req params (show teacher courses): ", req.params);
    let { id } = req.params;

    let sql = `SELECT user_course.user_id, course.* FROM (user_course, course) WHERE course.course_id = user_course.course_id AND user_course.user_id = "${id}"`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new teacherControllers();
