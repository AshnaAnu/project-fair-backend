//logic for register
//username,email,password => (email ? in db) ?
//"user already registered" : "post method execution -data saved to database"

const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log("Inside registerController");

    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        //check email in mongodb(model-users)
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("User already registered...")
        }
        else {
            //add the new user to database
            const newUser = new users({
                username,
                email,
                password,
                github: "",
                linkedin: "",
                profilePic: ""
            })
            //save new user to database
            await newUser.save()
            //send response to client
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(404).json({ message: err })
    }



    // res.status(200).json("Register Request Recieved")

}

exports.login = async (req, res) => {
    console.log("Inside Login Controller");

    const { email, password } = req.body
    console.log(email, password);

    try {
        //check email in mongodb(model-users)
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            //JWT token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_Key)
            res.status(200).json({ user: existingUser,token })
        }
        else {
            res.status(404).json('Invalid Email or Password')
        }

    } catch (err) {
        res.status(404).json({ message: err })
    }

}