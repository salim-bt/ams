const {db} = require("../utils/db");
const {assignment} = require("../utils/assignment");
const {allocate} = require("../utils/allocate");

const createEvent = async (req, res) => {
    try {
        const { title, description, startTime, duration, eventType } = req.body;
        let iso8601Date;
        const parts = startTime.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0]);
            const month = parseInt(parts[1]);
            const day = parseInt(parts[2]);

            // Creating a Date object and formatting it as ISO 8601
            const date = new Date(year, month - 1, day); // Note: Month is zero-based, so we subtract 1
            iso8601Date = date.toISOString();
        }

        // console.log(req.body)
        // if (!title || !description || !startTime || !duration || !eventType) {
        //   return res.status(400).json({ error: 'All fields are required' });
        // }

        const event = await db.event.create({
            data: {
                title,
                description,
                startTime: iso8601Date,
                duration,
                eventType,
            },
        });

        const councilors = await db.account.findMany({
            where:{
                role:"councilor"
            }
        })

        const councilorIds = councilors.map(student=>student.studentId);
        console.log(councilorIds)

        const classes = await db.class.findMany();

        const classIds = classes.map(cls => cls.id)

        classIds.map(classId=>{
            const randomIndex = Math.floor(Math.random() * councilorIds.length)
            const randomCouncilorId = councilorIds[randomIndex]
            assignment(event.id,classId,randomCouncilorId)
        });

        const students = await db.student.findMany();
        const studentIds = students.map(student=>student.studentId);
        console.log(studentIds)

        studentIds.map(studentId=>{
            allocate(event.id,studentId)
        })

        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllEvents = async (req, res) => {
    try {
        // Retrieve all events from the database
        const events = await db.event.findMany();

        // Send the events as a JSON response
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getFutureEvents = async (req, res) => {
    try {
        // Get the current date and time
        const currentDateTime = new Date().toISOString();

        // Retrieve all events that have a startTime greater than or equal to the current date and time
        const futureEvents = await db.event.findMany({
            where: {
                startTime: {
                    gte: currentDateTime,
                },
            },
        });

        // Send the future events as a JSON response
        res.status(200).json(futureEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editEventById = async (req, res) => {
    try {
        const id = req.params.id; // Get the event ID from the URL parameters
        const { title, description, startTime, duration, eventType } = req.body;

        // Check if the event with the specified ID exists
        const existingEvent = await db.event.findUnique({
            where: {
                id, // Assuming the field name in your database is "eventId"
            },
        });

        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Update the event with the new data
        const updatedEvent = await db.event.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                startTime,
                duration,
                eventType,
            },
        });

        // Send the updated event as a JSON response
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEventById = async (req, res) => {
    try {
        const id = req.params.id; // Get the event ID from the URL parameters

        // Check if the event with the specified ID exists
        const existingEvent = await db.event.findUnique({
            where: {
                id, // Assuming the field name in your database is "id"
            },
        });

        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Delete the event by ID
        await db.event.delete({
            where: {
                id,
            },
        });

        // Send a success response
        res.status(204).end(); // Changed status code to 204 (No Content) for successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEventById = async (req, res) => {

    const event = await db.event.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(event)
}

module.exports = {
    createEvent, getAllEvents, editEventById, deleteEventById, getEventById, getFutureEvents
};


