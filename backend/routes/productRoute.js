const express = require("express")
const router=express.Router()

const {createProduct,getAllProducts,updateProduct,deleteProduct,getSingleDetail} =require("../controller/productController")

const {isLoggedIn ,isAdmin} = require('../middleware/authentication')


router.route("/product").get( isLoggedIn, getAllProducts)


router.route("/product/createProduct").post(isLoggedIn , createProduct)


router.route("/product/:id").put(isLoggedIn,updateProduct)
router.route("/product/:id").delete(isLoggedIn,deleteProduct)
router.route("/product/:id").get(isLoggedIn,getSingleDetail)

module.exports=router