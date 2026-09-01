const express = require("express")

const authMiddleware = require("../middleware/authMiddleware")

const { createTask, getTasks} = require("../controllers/taskController")

const router = express.Router()

router.post("/create", authMiddleware, createTask)
router.get("/", authMiddleware, getTasks)


module.exports = router