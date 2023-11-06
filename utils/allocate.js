const {db} = require("./db");
const allocate = async (eventId,studentId)=>{
    return await db.attendance.create({
        data: {
            eventId: eventId,
            studentId: studentId,
        }
    });
}

module.exports = {
    allocate
}