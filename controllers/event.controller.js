const { db } = require("../utils/db");

const createEvent = async (req, res) => {
  try {
    const { title, description, startTime, eventType } = req.body;
    console.log(req.body)
    if (!title || !description || !startTime || !eventType) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    

    const event = await db.event.create({
      data: {
        title,
        description,
        startTime,
        eventType,
      },
    });

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

const editEventById = async (req, res) => {
  try {
    const id = req.params.id; // Get the event ID from the URL parameters
    const { title, description, startTime, duration } = req.body;

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

module.exports = {
  createEvent, getAllEvents,  editEventById, deleteEventById
};


