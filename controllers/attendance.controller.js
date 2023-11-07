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
    
}

const getCouncilorClassAssignment = async (req, res)=>{
    const {studentId} = req.params;

    const assignments = await db.assignment.findMany({
        where:{
            studentId
        }
    })

    console.log(assignments)

    if(assignments.length===0){
        console.log("Empty")
        res.status(200).json([])
        return
    }

    const classIds = assignments.map(assign=>assign.classId)

    const data = []

    for(let i=0;i<classIds.length;i++){
        const no_of_students = await db.student.count({
            where:{
                classId:classIds[i]
            }
        })

        const {academicYear,semester,programme,section} = await db.class.findFirst({
            where:{
                id:classIds[i]
            }
        })

        data.push({
            academicYear,
            semester,
            programme,
            classId:classIds[i],
            eventId:assignments[i].eventId,
            section,
            no_of_students
        })

    }

    res.status(200).json(data)
}

const getAttendanceListOfClass = async (req,res)=>{
    const {classId,eventId} = req.params;

    const students = await db.student.findMany({
        where:{
            classId
        }
    })

    const studentIds = students.map(student=>student.studentId)

    const data = []

    for(let i=0;i<studentIds.length;i++){
        const studentId = studentIds[i]
        const name = students[i].name
        const {status} = await db.attendance.findFirst({
            where:{
                eventId,
                studentId
            }
        })
        data.push({
            studentId,
            name,
            status
        })
    }

    res.status(200).json(data)

}

const submitAttendance = async (req,res)=>{
    const {eventId, data} = req.body;
    console.log(data)
    const updates =[]
    for(let i=0;i<data.length;i++){
        const {id} = await db.attendance.findFirst({
            where:{
                studentId:data[i].studentId,
                eventId
            }
        })
        const updatedDate = await db.attendance.update({
                where:{
                    id
                },
                data:{
                    status:data[i].status
                }
            }
        )
        updates.push(updatedDate)
    }

    res.status(200).json(updates)
}

module.exports = {
    takeAttendance,
    getAllAttendanceOfStudent,
    getCouncilorClassAssignment,
    getAttendanceListOfClass,
    submitAttendance
};



