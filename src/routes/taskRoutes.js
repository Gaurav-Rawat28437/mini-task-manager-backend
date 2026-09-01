const express = require("express")

const authMiddleware = require("../middleware/authMiddleware")

const { createTask, getTasks,getTaskById,updateTask} = require("../controllers/taskController")

const router = express.Router()

router.post("/create", authMiddleware, createTask)
router.get("/", authMiddleware, getTasks)
router.get("/:id", authMiddleware, getTaskById)
router.put("/:id", authMiddleware, updateTask)

module.exports = router