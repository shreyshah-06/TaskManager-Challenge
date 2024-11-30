const { Types } = require("mongoose");

exports.validateTaskId = (req, res, next) => {
  const { taskId } = req.params;
  
  if (!Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ status: false, msg: "Invalid Task ID" });
  }
  
  next();
};