const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(
    cors({
        origin: [
            process.env.FE_URL,
            "http://localhost:5173"
        ],
        credentials: true
    })
)

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

module.exports = app