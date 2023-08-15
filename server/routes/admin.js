var express = require("express");
var router = express.Router();
const adminControllers = require("../controllers/adminControllers");

// ---------------------------------------------------------------------
// 1.- Disable student
// localhost:4000/admin/disableStudent/:id
router.put("/disableStudent/:id", adminControllers.disableStudent);

// ---------------------------------------------------------------------
// 2.- Enable student
// localhost:4000/admin/enableStudent/:id
router.put("/enableStudent/:id", adminControllers.enableStudent);

// ---------------------------------------------------------------------
// 3.- Passed course
// localhost:4000/admin/passedCourse/:id
router.put("/passedCourse/:id", adminControllers.passedCourse);

// ---------------------------------------------------------------------
// 4.- Not passed course
// localhost:4000/admin/notPassedCourse/:id
router.put("/notPassedCourse/:id", adminControllers.notPassedCourse);

module.exports = router;
