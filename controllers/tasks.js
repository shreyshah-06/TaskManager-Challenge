const { checkUserTaskOwnership } = require("../utils/taskHelper.js");
const handleError = require("../utils/handleError.js");
const Task = require("../models/task");
exports.getTasks = async (req, res) => {
  try {
    // Fetch tasks specific to the logged-in user
    const tasks = await Task.find({ user: req.user.id });

    if (!tasks || tasks.length === 0) {
      return handleError(res, 404, "No tasks found for the user");
    }

    res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
  } catch (err) {
    console.error(err);
    return handleError(res, 500, "Internal Server Error");
  }
};

exports.getTask = async (req, res) => {
    try {
      const { taskId } = req.params;

      // Check if the task belongs to the user
      const task = await checkUserTaskOwnership(taskId, req.user.id);
      res.status(200).json({ task, status: true, msg: "Task found successfully.." });
    } catch (err) {
      console.error(err);
      return handleError(res, 400, err.message || "Internal Server Error");
    }
}

exports.postTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate title is provided
    if (!title) return handleError(res, 400, "Title of the task is required");

    // Create a new task associated with the logged-in user
    const task = await Task.create({ user: req.user.id, title, description });

    res.status(200).json({ task, status: true, msg: "Task created successfully.." });
  } catch (err) {
    console.error(err);
    return handleError(res, 500, "Internal Server Error");
  }
};

exports.putTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { taskId } = req.params;
    
        // Check if the task belongs to the user
        const task = await checkUserTaskOwnership(taskId, req.user.id);
    
        // Update the task's title and description
        const updatedFields = {};

        // Only update title if it's provided in the request body
        if (title) {
            updatedFields.title = title;
        }

        // Always update description if it's provided
        if (description) {
            updatedFields.description = description;
        }

        // If no fields are updated, return an error
        if (Object.keys(updatedFields).length === 0) {
            return handleError(res, 400, "No valid fields to update.");
        }

        // Find and update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedFields, { new: true });
        
        res.status(200).json({ task: updatedTask, status: true, msg: "Task updated successfully.." });
    } catch (err) {
        console.error(err);
        return handleError(res, 400, err.message || "Internal Server Error");
    }
};


exports.deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;

      // Check if the task belongs to the user
      await checkUserTaskOwnership(taskId, req.user.id);

      // Delete the task
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ status: true, msg: "Task deleted successfully.." });
    } catch (err) {
      console.error(err);
      return handleError(res, 400, err.message || "Internal Server Error");
    }
  }
