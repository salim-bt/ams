const { db } = require("../utils/db");

const takeAttendance = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);

    // Create multiple attendance records in the database
    const createdAttendance = await db.attendance.createMany({
      data: data
    });

    // Send the created attendance records as a JSON response
    res.status(201).json(createdAttendance); // Changed status code to 201 (Created)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  takeAttendance
};



