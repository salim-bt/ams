const { db } = require("../utils/db");

const getWeeklyReport = async (req, res) => {
    try {
        // Get the current date and time
        const currentDate = new Date();

        // Calculate the start date (Monday) of the current week
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - (currentDate.getDay() + 6) % 7);

        // Calculate the end date (current date and time)
        const endDate = new Date(currentDate);

        // Convert the dates to the appropriate format for querying the database
        const startDateTime = startDate.toISOString();
        const endDateTime = endDate.toISOString();
        console.log(startDate);
        console.log(endDate);

        const totalEvent = await db.event.count({
            where: {
                startTime: {
                    gte: startDateTime,
                    lte: endDateTime,
                },
            },
        });
        const totalStudent = await db.student.count();
        const totalPresent = await db.attendance.count({
            where: {
                status: 'PRESENT',
                Event: {
                    startTime: {
                        gte: startDateTime,
                        lte: endDateTime,
                    },
                },
            },
        });
        const totalAbsent = await db.attendance.count({
            where: {
                status: 'ABSENT',
                Event: {
                    startTime: {
                        gte: startDateTime,
                        lte: endDateTime,
                    },
                },
            },
        });
        const totalLeave = await db.leave.count({
            where: {
                status: 'PENDING',
                Event: {
                    startTime: {
                        gte: startDateTime,
                        lte: endDateTime,
                    },
                },
            },
        });

        const responseData = {
            totalEvent,
            totalStudent,
            totalPresent,
            totalAbsent,
            totalLeave,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching weekly report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPastWeeklyReport = async (req, res) => {
    try {
        // Get the current date and time
        const currentDate = new Date();
        
        const startPastDate = new Date(currentDate);
        startPastDate.setHours(0, 0, 0, 0); // Set time to 12:00:00 AM
        startPastDate.setDate(startPastDate.getDate() - (currentDate.getDay() + 6) % 7 - 7); // Subtract 7 days for the past week

        // Calculate the end date (12:00:00 AM Monday of the current week)
        const endPastDate = new Date(currentDate);
        endPastDate.setHours(0, 0, 0, 0); // Set time to 12:00:00 AM

        console.log(startPastDate);
        console.log(endPastDate);

        // Convert the dates to the appropriate format for querying the database
        const startPastDateTime = startPastDate.toISOString();
        const endPastDateTime = endPastDate.toISOString();

        const totalEvent = await db.event.count({
            where: {
                startTime: {
                    gte: startPastDateTime,
                    lte: endPastDateTime,
                },
            },
        });
        const totalStudent = await db.student.count();
        const totalPresent = await db.attendance.count({
            where: {
                status: 'PRESENT',
                Event: {
                    startTime: {
                        gte: startPastDateTime,
                        lte: endPastDateTime,
                    },
                },
            },
        });
        const totalAbsent = await db.attendance.count({
            where: {
                status: 'ABSENT',
                Event: {
                    startTime: {
                        gte: startPastDateTime,
                        lte: endPastDateTime,
                    },
                },
            },
        });
        const totalLeave = await db.leave.count({
            where: {
                status: 'PENDING',
                Event: {
                    startTime: {
                        gte: startPastDateTime,
                        lte: endPastDateTime,
                    },
                },
            },
        });

        const responseData = {
            totalEvent,
            totalStudent,
            totalPresent,
            totalAbsent,
            totalLeave,
        };

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching past weekly report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllWeeklyClassReports = async (req, res) => {
    try {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - (currentDate.getDay() + 6) % 7);

        const endDate = new Date(currentDate);

        const startDateTime = startDate.toISOString();
        const endDateTime = endDate.toISOString();

        const allClasses = await db.class.findMany();

        const classReports = [];

        for (const classInfo of allClasses) {
            const classStrength = classInfo.students?.length ?? 0;

            const totalEvents = await db.event.count({
                where: {
                    startTime: {
                        gte: startDateTime,
                        lte: endDateTime,
                    },
                    classId: classInfo.id,
                },
            });

            const totalPresents = await db.attendance.count({
                where: {
                    status: 'PRESENT',
                    Event: {
                        startTime: {
                            gte: startDateTime,
                            lte: endDateTime,
                        },
                        classId: classInfo.id,
                    },
                },
            });

            // Count total absents for the class within the date range
            const totalAbsents = await db.attendance.count({
                where: {
                    status: 'ABSENT',
                    Event: {
                        startTime: {
                            gte: startDateTime,
                            lte: endDateTime,
                        },
                        classId: classInfo.id,
                    },
                },
            });

            // Count total leaves for the class within the date range
            const totalLeaves = await db.leave.count({
                where: {
                    status: 'PENDING',
                    Event: {
                        startTime: {
                            gte: startDateTime,
                            lte: endDateTime,
                        },
                        classId: classInfo.id,
                    },
                },
            });

            // Create a report for the class
            const classReport = {
                Class: {
                    programme: classInfo.programme,
                    semester: classInfo.semester,
                },
                totalEvents,
                classStrength,
                totalPresents,
                totalAbsents,
                totalLeaves,
            };

            classReports.push(classReport);
        }

        res.status(200).json(classReports);
    } catch (error) {
        console.error('Error fetching all weekly class reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    getWeeklyReport,
    getPastWeeklyReport,
    getAllWeeklyClassReports,
};
