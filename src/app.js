const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoutes")
const authMiddleware = require("./middleware/authMiddleware")
const taskRoutes = require("./routes/taskRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Task Manager API is running"
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

module.exports = app