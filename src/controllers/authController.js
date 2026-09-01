const bcrypt = require("bcryptjs")
const validator = require("validator")

const User = require("../models/User")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            })
        }

        if (name.trim().length<2 || name.trim().length>50) {
            return res.status(400).json({
                success: false,
                message: "Name must be between 2 and 50 characters"
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password is not strong enough"
            })
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            })
        }

        
        const hashedPassword = await bcrypt.hash(password, 10)

       
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Register error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = {
    register,
}