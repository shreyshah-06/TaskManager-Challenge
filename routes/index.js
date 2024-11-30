const express = require("express");
const authRoutes = require("./authRoutes"); 
const profileRoutes = require("./profileRoutes"); 
const taskRoutes = require("./taskRoutes"); 

// Create an express Router instance
const router = express.Router();

// Use the imported routes
router.use("/auth", authRoutes); // Auth routes will be prefixed with '/auth'
router.use("/profile", profileRoutes); // Profile routes will be prefixed with '/profile'
router.use("/tasks", taskRoutes); // Profile routes will be prefixed with '/profile'

module.exports = router;
