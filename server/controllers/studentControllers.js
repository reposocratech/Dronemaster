const connection = require("../config/db");
const bcrypt = require("bcrypt");

class studentControllers {
  // 1.- Register student: Gets the information from the register form and creates and new student
  // http://localhost:4000/students/registerStudent
  registerStudent = (req, res) => {
    const { user_name, user_lastname, email, password } = req.body;

    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        err && res.status(401).json({ err });

        let sql = `INSERT INTO user (user_name, user_lastname, email, password) VALUES ( "${user_name}","${user_lastname}","${email}", "${hash}")`;

        connection.query(sql, (error, result) => {
          error
            ? res.status(400).json({ error })
            : res.status(201).json(result);
        });
      });
    });
  };
}

module.exports = new studentControllers();
