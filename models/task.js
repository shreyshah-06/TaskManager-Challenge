// const mongoose = require('mongoose')

// const TaskSchema = new mongoose.Schema({
//     name :{
//         type: String,
//         required : [true,'must provide name'],
//         trim: true,
//         maxlength: [20,'name cannot be more than 20 characters']
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// module.exports = mongoose.model('Task',TaskSchema)
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim : true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
