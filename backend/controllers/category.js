const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const Category = require("../models/Category")

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getCategories = asyncHandler(async (req, res, next) => {
  const category = await Category.find()
  // res.status(200).json(res.advancedResults)
  res.status(200).json({ success: true, data: category })
})

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  res.status(200).json({ success: true, data: category })
})

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body)

  res.status(201).json({ success: true, data: category })
})

// @desc       Update course
// @route      PUT /api/v1/courses/:id
// @access     Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id)
  if (!category) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
  }

  // Make sure user is course owner
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update`, 401))
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: category
  })
})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404))
  }

  // Make sure review belongs to user or user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse(`Not authorized to update`, 401))
  }

  await category.remove()

  res.status(200).json({
    success: true,
    data: {}
  })
})
