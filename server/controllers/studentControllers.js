const connection = require("../config/db");
const bcrypt = require("bcrypt");

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

  //1.- Register student: Gets the information from the register form and creates and new student

  registerStudent = (req, res) => {
    const { user_name, user_lastname, email, password } = req.body;
    //console.log(req.body)

    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (user_name, user_lastname, email, password) VALUES ( "${user_name}","${user_lastname}","${email}", "${hash}")`;

        connection.query(sql, (error, result) => {
          //console.log(error);
          //console.log(result);
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
           });
    });
  };

 
}

module.exports = new studentControllers();
