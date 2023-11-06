const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const {v4: uuidV4} = require('uuid');
const {
    getStudent,
    getStudentInfo,
    getAllStudents,
    getAllStudentsFromClass,
    updateStudent,
    createStudent, getAllCouncilors, getStudentEventsInfo,
    deleteStudent
} = require("../controllers/student.controller");

router.get("/get-student/:studentId", getStudent)
router.get("/get-student-info/:studentId", getStudentInfo)
router.get("/get-all-students", getAllStudents)
router.get("/get-all-students/class/:classId", getAllStudentsFromClass)
router.put("/update-student", updateStudent)
router.post("/create-student", createStudent)
router.get("/get-all-councilor", getAllCouncilors)
router.get("/get-student-dashboard-info/:studentId",getStudentEventsInfo)
router.post("/delete-student", deleteStudent)

module.exports = router;