var express = require('express');
var router = express.Router();
const {
    createEvent,
    getAllEvents,
    editEventById,
    deleteEventById,
    getEventById
} = require("../controllers/event.controller");
/* GET users listing. */
router.post('/createEvent', createEvent);
router.get('/getAllEvents', getAllEvents);
router.put('/editEventById/:id', editEventById);
router.delete('/deleteEventById/:id', deleteEventById);
router.get('/get-event-by-id/:id', getEventById)

module.exports = router;
