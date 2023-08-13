const express = require("express")
const router=express.Router()

const {registerUser , loginUser,getUserDetails,logout ,forgetPassword, resetPassword} =require("../controller/userController")

const {isLoggedIn , isAdmin }=require("../middleware/authentication")

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/password/forget").post(forgetPassword)

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);


// router.route("/me").get(isLoggedIn, getUserDetails);

// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


module.exports=router