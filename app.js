const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');
const classRouter = require('./routes/class');
const studentRouter = require('./routes/student');
const attendanceRouter = require('./routes/attendance');
const leaveRouter = require('./routes/leave');
const uploadRouter = require('./routes/upload');
const reportRouter = require('./routes/report');
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
app.use('/api/attendance',attendanceRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/file',uploadRouter);
app.use('/api/report',reportRouter);



module.exports = app;
