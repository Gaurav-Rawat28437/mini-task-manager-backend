const mongoose = require("mongoose")
const validator = require("validator")

const Task = require("../models/Task")

const createTask = async (req, res) => {
    try {

        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body

        if (!title || !description || !status || !priority) {
            return res.status(400).json({
                success: false,
                message: "Title, description, status and priority are required"
            })
        }


        if (title.trim().length<2 || title.trim().length>100) {
            return res.status(400).json({
                success: false,
                message: "Title must be between 2 and 100 characters"
            })
        }

      
        if (description.trim().length<2 || description.trim().length>1000) {
            return res.status(400).json({
                success: false,
                message: "Description must be between 2 and 1000 characters"
            })
        }

        const allowedStatus = [
            "Pending",
            "In Progress",
            "Completed"
        ]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            })
        }

        const allowedPriority = [
            "Low",
            "Medium",
            "High"
        ]

        if (!allowedPriority.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: "Invalid priority"
            })
        }

        if (dueDate && !validator.isDate(dueDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid due date"
            })
        }

        const task = await Task.create({
            title: title.trim(),
            description: description.trim(),
            status,
            priority,
            dueDate: dueDate || null,
            userId: req.user._id
        })

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        })

    } catch (error) {

        console.error("Create task error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            userId: req.user._id
        }).sort({
            createdAt: -1
        })

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        })

    } catch (error) {

        console.error("Get tasks error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    createTask,
    getTasks
}