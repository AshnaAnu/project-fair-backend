//1)import express
const express = require ("express")

//4)import userController
const userController = require("../Controllers/userController")

//2)create router from express
const router = express.Router()

//3)create route for each requests

    //1.Register route : http://localhost:3000/api/register
    router.post('/api/register',userController.register)
    
//5)export the router
    module.exports = router

