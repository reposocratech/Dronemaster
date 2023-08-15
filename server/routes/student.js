var express = require("express");
var router = express.Router();
const studentControllers = require("../controllers/studentControllers");


// ---------------------------------------------------------------------
// 1.- Get student info
// localhost:4000/students/oneStudent/:id
router.get("/oneStudent/:id", studentControllers.selectOneStudent);

/* localhost:4000/students */

//X.- Register student
//localhost:4000/students/registerStudent
//Gets the information from the register form and creates and new student

router.post("/registerStudent", studentControllers.registerStudent);


module.exports = router;
