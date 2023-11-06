const {db} = require("../utils/db");

const getStudent = async (req, res) => {

    const {studentId} = req.params;

    const student = await db.student.findFirst({
        where: {
            studentId
        }
    });


    const {role} = await db.account.findFirst(
        {
            where: {
                studentId
            }
        }
    )

    res.status(200).json({...student, role})
}

const updateStudent = async (req, res) => {
    const {
        studentId,
        name,
        email,
        gender,
        classId,
    } = req.body;

    const updatedStudent = await db.student.update({
        where: {
            studentId
        },
        data: {
            name,
            email,
            gender,
            classId
        }
    })

    res.status(204).json({msg: "user updated successfully", updatedStudent})
}

const getAllStudents = async (req, res) => {
    const students = await db.student.findMany({
        select: {
            studentId: true,
            email: true,
            name: true,
            createdAt: true,
            gender: true,
            account: {
                select: {
                    role: true,
                },
            },
            Class: {
                select: {
                    programme: true,
                    academicYear: true,
                    semester: true,
                },
            },
        },
    });
    res.status(200).json(students)
}
const getAllStudentsFromClass = async (req, res) => {

    const {classId} = req.params;

    const students = await db.student.findMany({
        where: {
            classId
        }
    })

    res.status(200).json(students)
}

const getAllCouncilors = async (req, res) => {
    const students = await db.student.findMany({
        where: {
            account: {
                role: "councilor"
            }
        }
    });
    res.status(200).json(students)
}

const createStudent = async (req, res) => {
    const {
        studentId,
        name,
        email,
        gender,
        classId
    } = req.body;

    const student = await db.student.create({
        data: {
            studentId,
            name,
            email,
            gender,
            classId
        }
    })

    res.status(201).json({student, msg: "student created successfully"})
}

const getStudentEventsInfo = (req,res) =>{

    const responseData = {
        "total_events":0,
        "total_presents":0,
        "total_absents":0,
        "total_leaves":0
    }
    res.status(200).json(responseData)
}

const getStudentInfo = async (req, res) => {
    const { studentId } = req.params;

    const studentInfo = await db.student.findFirst({
        where: {
            studentId
        },
        select: {
            studentId: true,
            name: true,
            email: true,
            gender: true,
            classId: true,
            Class: {
                select: {
                    programme: true,
                    semester: true
                }
            },
            account: {
                select: {
                    role: true
                }
            }
        }
    });

    if (!studentInfo) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(studentInfo);
}
const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    // Check if the student exists
    const existingStudent = await db.student.findFirst({
        where: {
            studentId
        }
    });

    if (!existingStudent) {
        return res.status(404).json({ error: 'Student not found' });
    }

    try {
        // Delete the student and associated data
        await db.student.delete({
            where: {
                studentId
            }
        });

        // Optionally, you can delete related data such as assignments, attendance, and leaves here

        res.status(204).json({ msg: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getStudentInfo,
    getStudentEventsInfo,
    getStudent,
    createStudent,
    getAllStudentsFromClass,
    getAllStudents,
    updateStudent,
    getAllCouncilors,
    deleteStudent
}