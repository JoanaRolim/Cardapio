const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Product = require("../models/Product")

// @desc      Get all product
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find()
  // res.status(200).json(res.advancedResults)
  res.status(200).json({ success: true, data: product })
})

// @desc      Get single product
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  res.status(200).json({ success: true, data: product })
})

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201).json({ success: true, data: product })
})

// @desc       Update course
// @route      PUT /api/v1/courses/:id
// @access     Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
  }

  // Make sure user is course owner
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update`, 401))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: product
  })
})

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404))
  }

  // Make sure review belongs to user or user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update`, 401))
  }

  await product.remove()

  res.status(200).json({
    success: true,
    data: {}
  })
})
