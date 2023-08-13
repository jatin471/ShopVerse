const User = require("../models/userModel")
const asyncHandler = require("../middleware/asyncHandler");
const sendToken = require("../helper/jwtToken");
const sendEmail=require("../helper/sendEmail.js");

// if (!product) {
//     return res.status(500).json({
//         success: false,
//         message: "Product Not Found"
//     })
// }

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    })
    sendToken(user,200,res)
})


exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Plese Enter email and password"
        })
    }
    const user= await User.findOne({email}).select("+password");


    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid email and password"
        })
    }

    const isCorrectPassword = user.comparePassword(password)

    if(!isCorrectPassword){
        return res.status(400).json({
            success: false,
            message: "Invalid email and password"
        })
    }

    sendToken(user,200,res)
})


exports.logout = asyncHandler(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Successfully Logged Out"
    })
})


exports.forgetPassword = asyncHandler(async (req, res, next) => {
    const user= await User.findOne({email:req.body.email})
    if(!user){
        return next( 
            res.status(400).json({
            success: false,
            message: "User Not Found"
        })
        )
    }


   const resetToken = user.getResetPasswordToken();

    console.log(resetToken)
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

    
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    console.log(message)
    console.log(user.email)
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
    }catch{
        // console.log(user)
        user.resetPasswordExpire=undefined
        user.resetPasswordToken=undefined
        await user.save({ validateBeforeSave: false });

        return next(
            res.status(500).json({
                success: false,
                message: "User Not Found Error"
            })
        )
    }
})

// Reset Password
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        res.status(400).json({
            success: false,
            message: "Reset Password Token Expired"
        })
      );
    }
    
    if (req.body.password !== req.body.confirmPassword) {
      return next(
        res.status(400).json({
            success: false,
            message: "Password Doesn't Match "
        })
      );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });