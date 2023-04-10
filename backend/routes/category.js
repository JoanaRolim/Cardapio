const express = require("express")
const { getCategory, getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/category")
const Category = require("../models/Category")
const advancedResults = require("../middleware/advancedResults")
const { authorize, protect } = require("../middleware/auth")

//const router = express.Router()
const router = express.Router()

router.use(protect)
router.use(authorize("admin", "user"))

router.route("/").get(authorize("user", "readonly", "admin"), getCategories).post(authorize("user", "admin"), createCategory)

router.route("/:id").get(protect, authorize("admin", "user"), getCategory).put(protect, authorize("admin", "user"), updateCategory).delete(protect, authorize("admin", "user"), deleteCategory)

module.exports = router
