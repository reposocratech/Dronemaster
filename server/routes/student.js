var express = require("express");
var router = express.Router();
const studentControllers = require("../controllers/studentControllers");

// ---------------------------------------------------------------------
// 1.- Get student info
// localhost:4000/students/oneStudent/:id
router.get("/oneStudent/:id", studentControllers.selectOneStudent);

module.exports = router;
