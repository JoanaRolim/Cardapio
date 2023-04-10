const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Load models
//const Cardapio = require("./models/Cardapio")
const User = require("./models/User")

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"))

//const cardapio = JSON.parse(fs.readFileSync(`${__dirname}/_data/cardapio.json`, "utf-8"))

// Import into DB
const importData = async () => {
  try {
    // await Cardapio.create(cardapio)
    await User.create(users)
    console.log("Data Imported...".green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    // await Cardapio.deleteMany()
    await User.deleteMany()
    console.log("Data Destroyed...".red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === "-i") {
  importData()
} else if (process.argv[2] === "-d") {
  deleteData()
}
