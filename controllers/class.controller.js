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

	res.status(201).json({
		updatedClass,
        msg:"class updated successfully"
	})
}

const deleteClass = async (req,res)=>{
    const {classId } = req.body;

    //check if class exists
    const classToDelete = await db.class.findFirst({
        where:{
            id:classId
        }
    })

    if (!classToDelete){
        res.status(401).json({msg:"class not found, deletion failed"})
    }

    const deletedClass = await db.class.delete({
        where:{
            id:classId
        }
    })

    res.status(202).json({msg:"resource deleted successfully"})

}

const getAllClasses = async (req,res)=>{

    const classes = await db.class.findMany()

    res.status(200).json(classes)
}

const getClass = async (req,res) =>{

    const {classId} = req.params;

    const requestedClass = await db.class.findFirst({
        where:{
            id:classId
        }
    })

    if(!requestedClass){
        res.status(401).json({msg:"class not found"})
    }

    res.status(200).json(requestedClass)
}

module.exports = {
    createClass,
    updateClass,
    deleteClass,
    getClass,
    getAllClasses
}
