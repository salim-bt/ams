var express = require('express');
var router = express.Router();
const {createEvent, getAllEvents, editEventById} = require("../controllers/event.controller");
/* GET users listing. */
router.post('/createEvent',createEvent);
router.get('/getAllEvents',getAllEvents);
router.put('/editEventById/:id', editEventById);

module.exports = router;
