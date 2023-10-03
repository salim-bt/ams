const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event')
const classRouter = require('./routes/class')
const studentRouter = require('./routes/student')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

/**
 * Routes
 * */
app.use('/api/auth',authRouter);
app.use('/api/student',studentRouter);
app.use('/api/events',eventRouter);
app.use('/api/class',classRouter);




module.exports = app;
