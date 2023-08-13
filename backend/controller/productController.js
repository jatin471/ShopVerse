const Product = require("../models/productModel")
const asyncHandler = require("../middleware/asyncHandler")
const ApiFeatures=require("../helper/apiFeatures")

//getAllProducts

exports.getAllProducts = asyncHandler(async (req, res) => {
    const resultPerPage=5;
    const productCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const product = await apifeature.query

    res.status(201).json({
        success: true,
        product,
        productCount
    })

})


//Get Single Product 


exports.getSingleDetail = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    res.status(200).json({
        success: true,
        product
    })
})
//createProduct  -- Admin

exports.createProduct = asyncHandler(async (req, res, next) => {

    req.body.user = req.user.id 
    
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})


//Update product --admin

exports.updateProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})


//Delete Product --Admin

exports.deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    }


    await product.deleteOne();

    res.status(200).json({
        success: true,
        product
    })
})