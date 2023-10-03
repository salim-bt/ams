const {verify} = require('jsonwebtoken')
const {db} = require("../utils/db");

const jwtSecretKey = 'very-secure-key';

const authenticate = (req,res,next)=>{
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({ message:'Authentication Required' });
    }

    verify(token,jwtSecretKey, (err,student)=>{
        if (err) {
            return res.status(403).json({ message: err });
        }
        const {studentId} = student;
        req.studentId = studentId;
        next();

    });
}

const authenticateAdmin = (req,res,next)=>{

    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({ message:'Authentication Required' });
    }

    verify(token,jwtSecretKey, async (err, student) => {
        if (err) {
            return res.status(403).json({message: 'Invalid token'});
        }
        const {studentId} = student;

        const admin = await db.admin.findFirst({
            where: {
                studentId
            }
        })

        if (admin === null){
            res.status(401).json({message:'Not Admin'})
        }

        req.studentId = studentId;
        next();

    });
}

module.exports = {authenticate,authenticateAdmin}