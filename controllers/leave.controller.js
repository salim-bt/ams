const { db } = require('../utils/db');

const createLeave = async (req, res) => {
  try {
    const { studentId, eventId, explanation, attachmentURL } = req.body;
    // const leaveStatus = 'PENDING'; // Set the default leave status
    console.log(req.body)

    const leave = await db.leave.create({
      data: {
        studentId,
        eventId,
        explanation,
        attachmentURL,
      },
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getLeaveById = async (req, res) => {
  try {
    const leave = await db.leave.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (leave) {
      res.status(200).json(leave);
    } else {
      res.status(404).json({ error: 'Leave not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllLeave = async (req, res) => {
  try {
    const leave = await db.leave.findMany();

    res.status(200).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateLeaveById = async (req, res) => {
  try {
    const id = req.params.id;
    const { studentId, eventId, explanation, attachmentURL } = req.body;

    const existingLeave = await db.leave.findUnique({
      where: {
        id,
      },
    });

    if (!existingLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    const updatedLeave = await db.leave.update({
      where: {
        id,
      },
      data: {
        studentId,
        eventId,
        explanation,
        attachmentURL,
      },
    });

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteLeaveById = async (req, res) => {
  try {
    const id = req.params.id;

    const existingLeave = await db.leave.findUnique({
      where: {
        id,
      },
    });

    if (!existingLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    await db.leave.delete({
      where: {
        id,
      },
    });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createLeave,
  getLeaveById,
  getAllLeave,
  updateLeaveById,
  deleteLeaveById,
};
