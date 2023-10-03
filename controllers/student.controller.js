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

module.exports = {getStudent}