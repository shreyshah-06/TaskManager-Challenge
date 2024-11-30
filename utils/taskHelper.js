const Task = require('../models/task');

// Helper function to check if task belongs to the user
const checkUserTaskOwnership = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");
    if (task.user.toString() !== userId) throw new Error("You don't have permission to access this task");
    return task;
  };

module.exports = { checkUserTaskOwnership };