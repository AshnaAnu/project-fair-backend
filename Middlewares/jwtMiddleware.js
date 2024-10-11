//for specific route
//import jwt
const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside JWT Middleware");
    //get the token from the request
    let token = req.headers['authorization'].slice(7)
    console.log(token);
    //verify the token
    const jwtResponse = jwt.verify(token,'superkeypf2024')
    console.log(jwtResponse);
    req.payload=jwtResponse.userId

    next()
    
    
}

module.exports = jwtMiddleware