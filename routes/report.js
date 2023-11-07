var express = require('express');
var router = express.Router();
const {
    getWeeklyReport,
    getPastWeeklyReport,
    getAllWeeklyClassReports,
} = require("../controllers/report.controller");
/* GET users listing. */
router.get('/getWeeklyReport',getWeeklyReport);
router.get('/getPastWeeklyReport',getPastWeeklyReport);
router.get('/getAllWeeklyClassReports', getAllWeeklyClassReports)
module.exports = router;