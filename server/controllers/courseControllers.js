const connection = require("../config/db");

class courseControllers {
  // 1.- Add commentary
  // localhost:4000/courses/addCommentary/:user_id/:course_id/:unit_id/:lesson_id
  addComentary = (req, res) => {
    console.log("req params (add comentary): ", req.params);

    let { user_id, course_id, unit_id, lesson_id } = req.params;
    let { comment_content } = req.body;
    console.log(("req body: ", req.body));

    let sql = `INSERT INTO comment (user_id, course_id, unit_id, lesson_id, comment_content) VALUES ("${user_id}", "${course_id}", "${unit_id}", "${lesson_id}", "${comment_content}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };

  responseComentary = (req, res) => {
    console.log("req params (add comentary): ", req.params);

    let { user_id, course_id, unit_id, lesson_id, parent_comment_id } =
      req.params;
    let { comment_content } = req.body;
    console.log(("req body: ", req.body));

    let sql = `INSERT INTO comment (user_id, course_id, unit_id, lesson_id, parent_comment_id, comment_content) VALUES ("${user_id}", "${course_id}", "${unit_id}", "${lesson_id}", "${parent_comment_id}", "${comment_content}")`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(201).json(result);
    });
  };
}

module.exports = new courseControllers();
