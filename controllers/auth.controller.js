const {db} = require("../utils/db");
const {generateAccessToken, generateRefreshToken} = require("../utils/tokens");
const {validationResult} = require("express-validator");
const {compare, hash} = require("bcrypt");

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {studentId, password} = req.body;

    try {
        const user = await db.account.findUnique({
            where: {
                studentId
            }
        });
        if (user == null) {
            res.status(404).json({message: "user not found"})
        }
        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const accessToken = generateAccessToken(user.studentId)
        const refreshToken = generateRefreshToken(user.studentId)

        const student = await db.student.findFirst({
            where:{
                studentId
            }
        })

        const classDetails = await db.class.findFirst({
            where:{
                id:student.classId
            }
        })

        console.log(student,classDetails)

        res.status(200).json({accessToken, refreshToken,role:user.role,student,classDetails})

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'})
    }

}

const register = async (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // check if student already registered
    const account = await db.account.findUnique({
        where:{
            studentId
        }
    })

    if (account){
        res.status(500).json({msg:"user already registered"})
    }

    const {studentId, email, gender, department, semester, password} = req.body;
    try {
        const studentClass = await db.class.findFirst({
            where:{
                semester,
                programme:department,
                academicYear:"2023",
                section:"1"
            }
        })

        const student = await db.student.create({
            studentId,
            email,
            gender,
            classId:studentClass.id,
            name
        })

        const account = await db.account.create({
            studentId,
            password
        })

        res.status(201).json({message: 'User registered successfully', user: newUser});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {login, register}