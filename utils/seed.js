const {db} = require("./db");
const seed = async ()=>{
    const depts = [
        "Information Technology",
        "Electronics and Communications Engineering",
        "Electrical Engineering",
        "Engineering Geology",
        "Architecture",
        "Instrumentation and Control Engineering",
        "Software Engineering",
        "Water Resource Engineering",
        "Mechanical Engineering",
        "Civil Engineering"
    ]

    const data = [
        {
            programme:"Information Technology",
            academicYear:"1",
            semester:"i",
            section:"1"
        },
        {
            programme:"Information Technology",
            academicYear:"2",
            semester:"iii",
            section:"1"
        },
        {
            programme:"Information Technology",
            academicYear:"3",
            semester:"v",
            section:"1"
        },
        {
            programme:"Electronics and Communications Engineering",
            academicYear:"1",
            semester:"i",
            section:"1"
        },
        {
            programme:"Electronics and Communications Engineering",
            academicYear:"2",
            semester:"iii",
            section:"1"
        },
        {
            programme:"Electronics and Communications Engineering",
            academicYear:"3",
            semester:"v",
            section:"1"
        },
        {
            programme:"Electrical Engineering",
            academicYear:"1",
            semester:"i",
            section:"1"
        },
        {
            programme:"Electrical Engineering",
            academicYear:"2",
            semester:"iii",
            section:"1"
        },
        {
            programme:"Electrical Engineering",
            academicYear:"3",
            semester:"v",
            section:"1"
        },
        {
            programme:"Engineering Geology",
            academicYear:"3",
            semester:"v",
            section:"1"
        },
        {
            programme:"Engineering Geology",
            academicYear:"2",
            semester:"iii",
            section:"1"
        },
        {
            programme:"Engineering Geology",
            academicYear:"1",
            semester:"i",
            section:"1"
        },
        {
            programme:"Architecture",
            academicYear:"1",
            semester:"i",
            section:"1"
        },
        {
            programme:"Architecture",
            academicYear:"2",
            semester:"iii",
            section:"1"
        },
        {
            programme:"Architecture",
            academicYear:"3",
            semester:"v",
            section:"1"
        },
    ]

    await db.class.createMany({
        data:[

        ]
    })
}