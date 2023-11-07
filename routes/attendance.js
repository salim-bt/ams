const express = require('express');
const router = express.Router();
const { takeAttendance, getAllAttendanceOfStudent, getCouncilorClassAssignment, getAttendanceListOfClass,
    submitAttendance
} = require("../controllers/attendance.controller");

// Take attendance by updating status
router.post('/takeAttendance', takeAttendance);
router.get('/get-all-attendance-of-student/:studentId',getAllAttendanceOfStudent)
router.get('/get-councilor-class-assignment/:studentId',getCouncilorClassAssignment)
router.get('/get-attendance-list-of-class/:eventId/:classId',getAttendanceListOfClass)
router.put('/submit-attendance',submitAttendance)
module.exports = router;