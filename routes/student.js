const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const {
    getStudent,
    getAllStudents,
    getAllStudentsFromClass,
    updateStudent,
    createStudent, getAllCouncilors, getStudentEventsInfo
} = require("../controllers/student.controller");

router.get("/get-student/:studentId", getStudent)
router.get("/get-all-students", getAllStudents)
router.get("/get-all-students/class/:classId", getAllStudentsFromClass)
router.put("/update-student/:studentId", updateStudent)
router.post("/create-student", createStudent)
router.get("/get-all-councilor", getAllCouncilors)
router.get("/get-student-dashboard-info/:studentId",getStudentEventsInfo)

module.exports = router;