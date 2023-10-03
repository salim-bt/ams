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

const register = async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {studentId, name,email, gender, programme, semester, password, section, academicYear} = req.body;

    // check if student already registered
    const account = await db.account.findUnique({
        where:{
            studentId
        }
    })

    if (account){
        res.status(500).json({msg:"user already registered"})
    }

    try {
        const studentClass = await db.class.findFirst({
            where:{
                semester,
                programme,
                academicYear,
                section
            }
        })

        const student = await db.student.upsert({
            where:{
                studentId
            },
            update:{
              name,
              email,
              gender
            },
            create:{
                studentId,
                name,
                email,
                gender,
                classId:studentClass.id
            }
        })

        const hashedPassword = await hash(password,10)

        await db.account.create({
            data:{
                studentId,
                password:hashedPassword
            }
        })

        res.status(201).json({message: 'User registered successfully', user: student});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {login, register}