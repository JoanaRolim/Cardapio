const express = require("express")
const { getProduct, getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/product")
const Product = require("../models/Product")
const advancedResults = require("../middleware/advancedResults")
const { authorize, protect } = require("../middleware/auth")

//const router = express.Router()
const router = express.Router()

router.use(protect)
router.use(authorize("admin", "user"))

router.route("/").get(authorize("user", "readonly", "admin"), getProducts).post(authorize("user", "admin"), createProduct)

router.route("/:id").get(protect, authorize("admin", "user"), getProduct).put(protect, authorize("admin", "user"), updateProduct).delete(protect, authorize("admin", "user"), deleteProduct)

module.exports = router
