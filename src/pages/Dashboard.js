import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Navbar from "../components/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Convert to IST (UTC +5:30)
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata", // Set the time zone to IST
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  return formattedDate; // "DD-MM-YYYY, HH:mm:ss"
};

const fetchTaskData = async () => {
  const token = localStorage.getItem("authToken"); // Get the token from localStorage

  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  try {
    const response = await axios.get("http://localhost:5000/api/tasks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract the tasks from the response
    const tasks = response.data.tasks;

    return tasks; // Return the tasks array
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const updateTask = async (id, updatedTask) => {
  console.log("here");
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  try {
    const response = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      updatedTask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const TaskManagementBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [viewTask, setViewTask] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'TODO'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTaskData();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      // Validate task fields
      if (!newTask.title.trim()) {
        alert("Title cannot be empty");
        return;
      }

      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      // Send POST request to create new task
      await axios.post("http://localhost:5000/api/tasks/", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Fetch updated tasks
      const updatedTasks = await fetchTaskData();
      setTasks(updatedTasks);

      // Close dialog and reset new task state
      setOpenAddDialog(false);
      setNewTask({
        title: '',
        description: '',
        status: 'TODO'
      });
      toast.success("Task added successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to add task.", {
        position: "top-right",
      });
      console.error("Error adding new task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authorization token is missing.");
      }
      const response = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }

      );
      if (response.status === 200) {
        toast.success("Task deleted successfully!", {
          position: "top-right",
        });
        const updatedTasks = await fetchTaskData();
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.", {
        position: "top-right",
      });
    }
  };
  // Function to open the Edit Dialog
  const handleEditTask = (task) => {
    setEditTask({ ...task });
    setOpenEditDialog(true);
  };

  const handleViewTask = (task) => {
    setViewTask(task);
    setOpenViewDialog(true);
  };

  // Save the updated task to the backend and update state
  const saveEditedTask = async (e) => {
    e.preventDefault();
    console.log("int thaer");
    try {
      // Validate task fields
      if (!editTask.title.trim()) {
        alert("Title cannot be empty");
        return;
      }

      // Update task in the backend
      const updatedTaskResponse = await updateTask(editTask._id, {
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      });

      // Fetch updated tasks
      const updatedTasks = await fetchTaskData();

      // Update state with new data
      setTasks(updatedTasks);

      // Close the dialog and reset edit task
      setOpenEditDialog(false);
      setEditTask(null);
      toast.success("Task updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to update task.", {
        position: "top-right",
      });
      console.error("Error saving edited task:", error);
      // alert("Failed to save task. Please try again.");
    }
  };

  // Update task status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        await axios.patch(
          `http://localhost:5000/api/tasks/${id}/status`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Fetch updated tasks
        const updatedTasks = await fetchTaskData();
        setTasks(updatedTasks);
        toast.success("Task status updated successfully!", {
          position: "top-right",
        });
      } catch (error) {
        toast.error("Failed to update task status.", {
          position: "top-right",
        });
        console.error("Error updating task status:", error);
        // alert("Failed to update task status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const renderTaskCard = (task) => (
    <Card key={task.id} sx={{ mb: 2, bgcolor: "lightblue", p: 1 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
          {task.title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Created at: {formatDate(task.createdAt)}
        </Typography>
        <Grid container spacing={1} justifyContent="flex-start">
          {task.status === "TODO" && (
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleStatusUpdate(task._id, "IN_PROGRESS")}
                sx={{ textTransform: "none" }}
              >
                In Progress
              </Button>
            </Grid>
          )}
          {task.status === "IN_PROGRESS" && (
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => handleStatusUpdate(task._id, "DONE")}
                sx={{ textTransform: "none" }}
              >
                Done
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleViewTask(task)}
              sx={{ textTransform: "none" }}
            >
              View
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
              onClick={() => handleEditTask(task)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const renderTaskColumn = (status, title) => (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          {tasks.filter((task) => task.status === status).map(renderTaskCard)}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box>
      <Navbar />
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "flex-start" },
          mt: 1,
          ml: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "300px", sm: "none" },
          }}
          onClick={() => setOpenAddDialog(true)}
        >
          + Add New Task
        </Button>
      </Grid>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {renderTaskColumn("TODO", "To-Do")}
        {renderTaskColumn("IN_PROGRESS", "In Progress")}
        {renderTaskColumn("DONE", "Done")}
      </Grid>

      {/* View Task Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          {viewTask && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {viewTask.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {viewTask.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Created at: {formatDate(viewTask.createdAt)}
              </Typography>
              <Typography variant="body2">
                Due Date: {formatDate(viewTask.dueDate)}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {editTask && (
            <>
              <TextField
                label="Title"
                fullWidth
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({ ...editTask, title: e.target.value })
                }
                sx={{
                  mb: 2,
                  mt: 1,
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({ ...editTask, description: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={saveEditedTask} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{
              mb: 2,
              mt: 1,
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={newTask.dueDate || ""}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              label="Status"
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="TODO">To Do</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="DONE">Done</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="secondary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default TaskManagementBoard;
