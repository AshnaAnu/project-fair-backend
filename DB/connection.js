//1) import mongoose
const mongoose = require('mongoose')

//2)create connection string
const connection_string = process.env.CONNECTION_STRING

//3) connected to the database
mongoose.connect(connection_string).then((res)=>{
    console.log('MongoDB Connection Established with pfServer');
    
}).catch((err)=>{
    console.log('MongoDB Connection Error' + err);
    
})