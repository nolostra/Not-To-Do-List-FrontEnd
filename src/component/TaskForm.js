import React, { useState, useEffect } from "react";
import AuthService from "../services/api";
// import { UserContext } from '../contexts/UserContext';

const TaskForm = ({ onSubmit, buttonText, initialTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  // const { user } = useContext(UserContext);
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setDescription(initialTask.description || "");
      setPriority(initialTask.priority || "medium");
      setDueDate(initialTask.dueDate || "");
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await localStorage.getItem("token");
    try {
      if (initialTask) {
        // Update existing task
        
        const response = await AuthService.updateTask(initialTask._id, {
          title,
          description,
          priority,
          dueDate,
        },token);
        console.log("Task updated successfully:", response.data);
      } else {
        // Create a new task
        const response = await AuthService.postTask({
          title,
          description,
          priority,
          dueDate,
        },token);
        console.log("Task created successfully:", response.data);
      }

      onSubmit(); // Trigger a reload or update of the task list after submitting
    } catch (error) {
      console.error("Error submitting task:", error.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Task Form</h2>
      <label className="form-label">
        Title:
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="form-label">
        Description:
        <input
          className="form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="form-label">
        Priority:
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <label className="form-label">
        Due Date:
        <input
          className="form-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <button className="form-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default TaskForm;
