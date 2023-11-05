const express = require('express');
const router = express.Router();
const { takeAttendance, getAllAttendanceOfStudent} = require("../controllers/attendance.controller");

// Take attendance by updating status
router.post('/takeAttendance', takeAttendance);
router.get('/get-all-attendance-of-student/:studentId',getAllAttendanceOfStudent)

module.exports = router;