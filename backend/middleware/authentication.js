const asyncHandler=require("./asyncHandler")
const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

exports.isLoggedIn=asyncHandler(async(req,res,next)=>{
    const {token} =req.cookies;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Please login "
        })
    }
    const decodedData= jwt.verify(token,process.env.JWT_SECRET);

    await User.find
})

 
exports.isAdmin = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
             res.status(401).json({
                success: false,
                message: "Not Admin"
            })
        );
      }
    
      next();
    };
};
