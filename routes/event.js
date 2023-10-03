var express = require('express');
var router = express.Router();
const {createEvent, getAllEvents, editEventById, deleteEventById} = require("../controllers/event.controller");
/* GET users listing. */
router.post('/createEvent',createEvent);
router.get('/getAllEvents',getAllEvents);
router.put('/editEventById/:id', editEventById);
router.delete('/deleteEventById/:id', deleteEventById);

module.exports = router;
