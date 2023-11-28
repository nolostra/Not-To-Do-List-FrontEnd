import React, { useEffect, useState, useContext } from "react";
import AuthService from "../services/api";
import TaskForm from "./TaskForm";
import { UserContext } from "../contexts/UserContext";
import {   toast } from "react-toastify";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(UserContext);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const [editDescription, setEditDescription] = useState(null);
  const [editPriority, setEditPriority] = useState(null);
  const [editDueDate, setEditDueDate] = useState(null);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // console.log("user=>", user);
      const token = await localStorage.getItem("token");
      // console.log("AuthToken =>", token);
      const response = await AuthService.getTasks(token);
      // console.log("response => ", response.data[0]);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };
  const handleDelete = async (taskId) => {
    try {
      const token = await localStorage.getItem("token");
      const response = await AuthService.deleteTask(taskId, token);
      setTasks(tasks.filter((task) => task._id !== taskId));
      console.log("Task deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      // Assuming you have an `updateTask` function in your AuthService or another service
      const token = await localStorage.getItem("token");
      const response = await AuthService.updateTask(editingTask._id, {
        
        "title":editTitle,
        "description":editDescription,
        "priority":editPriority,
        "dueDate":editDueDate,
      }, token);

      // Update the task in the local state
      fetchTasks();
      toast('Task Updated Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log("Task updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating task:", error.message);
      toast('Error updating task', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } finally {
      // Clear the selected task
      setSelectedTask(null);
      handleCancelEdit()
    }
  };
  const handleEdit = (task) => {
    setEditDescription(task.description)
    setEditDueDate(task.dueDate)
    setEditPriority(task.priority)
    setEditTitle(task.title)
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditDescription(null)
    setEditDueDate(null)
    setEditPriority(null)
    setEditTitle(null)
    setEditingTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "#33cc33"; // Light green
      case "medium":
        return "#ffff00"; // Lemon chiffon
      case "high":
        return "#ff3300"; // Light coral
      default:
        return "#fff"; // Default background color
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        <h2>NOT to Do Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="task-item"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {editingTask === task ? (
                // Render edit form
                <div>
                  <label className="form-label">
                    Title:
                    <input
                      type="text"
                      value={editTitle ? editTitle : task.title}
                      onChange={(e) => {
                        const inputValue = e.target.value.trim(); // Remove leading and trailing whitespaces
                        setEditTitle(inputValue.length > 0 ? inputValue : " ");
                      }}
                    />
                  </label>
                  <label className="form-label">
                    Description:
                    <input
                      type="text"
                      value={
                        editDescription ? editDescription : task.description
                      }
                      onChange={(e) => {
                        /* Implement logic to update description */
                        const inputValue = e.target.value.trim();
                        setEditDescription(inputValue.length > 0 ? inputValue : " ");
                      }}
                    />
                  </label>
                  <label className="form-label">
                    Priority:
                    <select
                      className="form-select"
                      value={editPriority ? editPriority : task.priority}
                      onChange={(e) => {
                        setEditPriority(e.target.value);
                      }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </label>
                  <label className="form-label">
                    Due Date:
                    <input
                      type="date"
                      value={editDueDate ? editDueDate : task.dueDate}
                      onChange={(e) => {
                        /* Implement logic to update description */
                        setEditDueDate(e.target.value);
                      }}
                    />
                  </label>

                  {/* Add inputs for other properties like priority and dueDate */}
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                // Render task details
                <div>
                  <div>
                    <strong>Title:</strong> {task.title}
                  </div>
                  <div>
                    <strong>Description:</strong> {task.description}
                  </div>
                  <div>
                    <strong>Priority:</strong> {task.priority}
                  </div>
                  <div>
                    <strong>Due Date:</strong> {task.dueDate}
                  </div>
                  {user && user.role === "HRAdmin" && (
                    <div className="task-actions">
                      <button onClick={() => handleEdit(task)}>Edit</button>
                      <button onClick={() => handleDelete(task._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="task-form-container">
        {user && user.role === "HRAdmin" && (
          <TaskForm
            onSubmit={async () => {
              // Reload or update the task list (if needed)
              await fetchTasks();
            }}
            buttonText={selectedTask ? "Update Task" : "Add Task"}
            initialTask={selectedTask}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;
