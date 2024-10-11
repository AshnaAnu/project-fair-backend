const applicationMiddleware = (req,res,next)=>{
    console.log("Inside the Application Middleware");
    next()
    
}


module.exports = applicationMiddleware;


//this middleware is not used here...just showed for a demo