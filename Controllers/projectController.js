const projects = require('../Models/projectSchema')

exports.addProject=async(req,res)=>{
    console.log("inside add project controller");
    const {title,language,website,github,overview}=req.body
    const projectImg =req.file.filename
    const userId = req.payload

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject) {
            res.status(406).json("Project already exists")
        }
        else{
            const newProject = new projects({
                title,language,website,github,overview,projectImg,userId
            })
            console.log(userId);
            
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(error){
        res.status(500).json("Server error"+error)
    }
    
}

exports.getAllProjects = async(req,res) => {
    console.log("inside getAllProjects");
    try{
        const getAllProjects = await projects.find()
        res.status(200).json(getAllProjects)
    }
    catch(error){
        res.status(500).json("Server error"+error)
    }
}
exports.getUserProjects = async(req,res) => {

    console.log("inside getUserProjects");
    const userId = req.payload
    try{
        const getUserProjects = await projects.find({userId})
        res.status(200).json(getUserProjects)
    }
    catch(error){
        res.status(500).json("Server error"+error)
    }

    
}
exports.getHomeProjects = async(req,res) => {
    try{
        const getHomeProjects = await projects.find().limit(3)
        res.status(200).json(getHomeProjects)
    }
    catch(error){
        res.status(500).json("Server error"+error)
    }
}

//edit project controller
exports.editProject = async(req,res) =>{
    console.log("Inside editProject Controller");
    const {title,language,website,github,overview,projectImg}=req.body
    const uploadImg =req.file?req.file.filename:projectImg
    const userId = req.payload
    const {projectId} = req.params

    try{
        const updateProject = await projects.findByIdAndUpdate({_id:projectId},{title:title,language:language,github:github,website:website,overview:overview,projectImg:uploadImg,userId})
        await updateProject.save()
        res.status(200).json(updateProject)

    }
    catch(error){
        res.status(401).json("Internal error")

    }
    
}


// const projects = require('../Models/projectSchema')

// exports.addProject = async (req, res) => {
//     console.log("inside add project controller");
//     const { title, language, github, website, overview } = req.body;
//     const projectImg = req.file.filename;
//     const userId = req.payload;

//     try {
//         const existingProject = await projects.findOne({ github })
//         if (existingProject) {
//             res.status(406).json("project already exists")
//         }
//         else {
//             const newProject = new projects({
//                 title, language, github, website, overview, projectImg, userId
//             })
//             await newProject.save()
//             res.status(200).json(newProject)
//         }


//     } catch (error) {
//         res.status(500).json("server error" + error)

//     }

//     // res.status(200).send("Add Request Recieved");

// }

// //get all projects controller function

// exports.getAllProjects = async (req, res) => {
//     console.log("Inside GetAllProjects");
    
//     try {
//         const getAllProjects = await projects.find(); // Fetch all projects from DB
//         res.status(200).json(getAllProjects);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// //get projects by user

// exports.getProjectsByUser = async (req, res) => {
//     const userId = req.payload;
//     try {
//         const userProjects = await projects.find({ userId }); 
//         res.status(200).json(userProjects);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Controller to get home projects 
// exports.getHomeProjects = async (req, res) => {
//     try {
//         const homeProjects = await projects.find().limit(3); // Fetch the first 3 projects
//         res.status(200).json(homeProjects);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };