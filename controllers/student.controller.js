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


module.exports = {
    getStudent,
    createStudent,
    getAllStudentsFromClass,
    getAllStudents,
    updateStudent,
    getAllCouncilors
}