var express = require('express');
var router = express.Router();
const {
    createLeave,
    getLeaveById,
    getAllLeave,
    updateLeaveById,
    deleteLeaveById
} = require("../controllers/leave.controller");

// Create a new leave entry
router.post('/createLeave', createLeave);

// Retrieve leave details by ID
router.get('/getLeaveById/:id', getLeaveById);

// Retrieve all leave entries
router.get('/getAllLeave', getAllLeave);

// Update leave details by ID
router.put('/updateLeaveById/:id', updateLeaveById);

// Delete leave entry by ID
router.delete('/deleteLeaveById/:id', deleteLeaveById);

module.exports = router;
