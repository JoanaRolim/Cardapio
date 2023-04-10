const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error")
const connectDB = require("./config/db")

// Load env vars
dotenv.config({ path: "./config/config.env" })

// Connect to database
connectDB()

// Route files
const auth = require("./routes/auth")
const users = require("./routes/users")
const product = require("./routes/product")
const category = require("./routes/category")

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"))
}

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Mount routers
app.use("/api/category", category)
app.use("/api/product", product)
app.use("/api/auth", auth)
app.use("/api/users", users)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow.bold))

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)

  // Close server & exit process
  server.close(() => process.exit(1))
})
