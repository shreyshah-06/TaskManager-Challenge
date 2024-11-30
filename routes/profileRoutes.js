const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authValidators");
const {
  getProfile,
  updateProfilePicture,
  deleteProfile,
} = require("../controllers/user");

// Protected Routes (User must be authenticated to access these)
router.get("/", authMiddleware, getProfile); // Get user profile
router.put("/picture", authMiddleware, updateProfilePicture); // Update profile picture
router.delete("/", authMiddleware, deleteProfile); // Delete user profile

module.exports = router;