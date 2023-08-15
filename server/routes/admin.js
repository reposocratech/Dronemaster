var express = require("express");
var router = express.Router();
const adminControllers = require("../controllers/adminControllers");

/* localhost:4000/admin */

//X.- View all students
//localhost:4000/admin/allStudents
//Brings the information of all the students suscribed in the portal

router.get("/allStudents", adminControllers.viewAllStudents);

//X.- Enable resources
//localhost:4000/admin/enableResource

router.put("/enableResource/:lesson_id", adminControllers.enableReources);

//X.- Disable resources
//localhost:4000/admin/disableResource

router.put("/disableResource/:lesson_id", adminControllers.enableReources);

//X.- Enable teacher
//localhost:4000/admin/enableTeacher

router.put("/enableTeacher/:id", adminControllers.enableTeacher);

//X.- Disable teacher
//localhost:4000/admin/disableTeacher
router.put("/disableTeacher/:id", adminControllers.disableTeacher);

module.exports = router;
