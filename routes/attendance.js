const express = require('express');
const router = express.Router();
const { takeAttendance } = require("../controllers/attendance.controller");

// Take attendance by updating status
router.post('/takeAttendance', takeAttendance);

module.exports = router;