const { db } = require("../utils/db");

const createEvent = async (req, res) => {
  try {
    const { title, description, startTime, duration } = req.body;
    console.log(req.body)
    if (!title || !description || !startTime || !duration) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    

    const event = await db.event.create({
      data: {
        title,
        description,
        startTime,
        duration,
      },
    });

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createEvent
};
