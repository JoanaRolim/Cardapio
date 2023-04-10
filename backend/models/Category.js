const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Category", CategorySchema)
