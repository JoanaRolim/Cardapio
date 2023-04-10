const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  categories: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true
  },
  name: {
    type: String,
    required: [true, "Por favor, informe um nome"]
  },
  qty: {
    type: Number,
    min: 1,
    max: 100,
    required: [true, "Adicione uma quantidade entre 1 e 100"]
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Product", ProductSchema)
