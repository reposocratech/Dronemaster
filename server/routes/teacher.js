var express = require("express");
var router = express.Router();
const teacherControllers = require("../controllers/teacherControllers");

/* localhost:4000/teachers */

//X.- Enable resources
//localhost:4000/teachers/enableResource

router.put("/enableResource/:lesson_id", teacherControllers.enableReources);

//X.- Disable resources
//localhost:4000/teachers/disableResource

router.put("/disableResource/:lesson_id", teacherControllers.disableReources);

module.exports = router;
