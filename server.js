require("dotenv").config()

const dns = require("dns")

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
])

const mongoose = require("mongoose")
const app = require("./src/app")

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully")

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message)
        process.exit(1)
    })