const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask, updateTaskStatus } = require("../controllers/tasks");
const { authMiddleware } = require("../middlewares/authValidators");
const {validateTaskId} = require("../middlewares/validateTaskId");

// Public Routes
router.post("/", authMiddleware, postTask);  // Create task

// Protected Routes
router.get("/", authMiddleware, getTasks);  // Get all tasks for the user
router.get("/:taskId", authMiddleware, validateTaskId, getTask);  // Get a single task
router.put("/:taskId", authMiddleware, validateTaskId, putTask);  // Update task
router.delete("/:taskId", authMiddleware, validateTaskId, deleteTask);  // Delete task
router.patch("/:taskId/status", authMiddleware, validateTaskId, updateTaskStatus);  // Update task status

module.exports = router;
