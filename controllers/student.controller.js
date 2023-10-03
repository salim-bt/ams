const {db} =  require("../utils/db");

const getStudent = async(req,res)=>{

    const {studentId} = req.params;

    const student = await db.student.findFirst({
        where:{
            studentId
        }
    });


    const {role} = await db.account.findFirst(
        {
            where:{
                studentId
            }
        }
    )

    res.status(200).json({...student,role})
}

const updateStudent = async(req,res)=>{
    const {
        studentId,
        name,
        email,
        gender,
        classId,
    } = req.body;

    const updatedStudent = await db.student.update({
        where:{
            studentId
        },
        data:{
            name,
            email,
            gender,
            classId
        }
    })

    res.status(204).json({msg:"user updated successfully",updatedStudent})
}



module.exports = {getStudent}