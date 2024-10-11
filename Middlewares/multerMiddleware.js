//to store images and how touse it all
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename = `image${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
    {
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Invalid File Format"))
    }
}
const multerConfig = multer({
    storage,
    fileFilter,
})

module.exports = multerConfig