const {validationResult} = require("express-validator");
const {db} = require("../utils/db");
const createClass = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {programme,academicYear,semester,section} = req.body;

    const classname = await db.class.findFirst({
        where:{
            programme,
            academicYear,
            semester,
            section
        }
    })

    if (classname){
        res.status(400).json({message:"class already there"})
    }

    const newClass = await db.class.create(
        {
            programme,
            academicYear,
            semester,
            section
        }
    )

    res.status(200).json([newClass])

}

const updateClass = async (req,res)=>{
	const {classId,programme,academicYear,semester,section} = req.body;

	const updatedClass = await db.class.update({
		where:{
			id:classId
		},
		update:{
			programme,
			academicYear,
			semester,
			section
		}
	});

	res.status(200).json([{
		updatedClass
	}])
}



module.exports = {createClass}
