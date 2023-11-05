const {db} = require("../utils/db");

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
        res.status(500).json({error: 'Internal server error'});
    }
};

const getAllAttendanceOfStudent = (req,res)=>{
    const data = [
        {
            "event_name":"Morning Assembly",
            "date":"2023-11-05T10:38:31.688Z",
            "status":"PRESENT"
        },
        {
            "event_name":"SUPW",
            "date":"2023-10-05T10:38:31.688Z",
            "status":"PRESENT"
        },
        {
            "event_name":"Morning Assembly",
            "date":"2023-10-05T10:38:31.688Z",
            "status":"PRESENT"
        }
    ]

    res.status(200).json(data)
}

module.exports = {
    takeAttendance,
    getAllAttendanceOfStudent
};



