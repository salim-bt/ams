const {db} = require("./db");
const assignment = async (eventId,classId,studentId)=>{
    return await db.assignment.create({
        data: {
            eventId: eventId,
            classId: classId,
            studentId: studentId,
        }
    });
}

module.exports = {
    assignment
}