const {uploadFile} = require("../utils/minio");
const upload = async (req,res)=>{
    console.log("start")
    const file = req.file;
    console.log(file.originalname)
    const url = await uploadFile(file)
    res.status(200).send(url)
}

module.exports = {upload}