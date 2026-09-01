const express = require("express")

const authMiddleware = require("../middleware/authMiddleware")

const { createTask, getTasks,getTaskById} = require("../controllers/taskController")

const router = express.Router()

router.post("/create", authMiddleware, createTask)
router.get("/", authMiddleware, getTasks)
router.get("/:id", authMiddleware, getTaskById)


module.exports = router