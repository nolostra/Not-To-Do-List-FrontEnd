import React, { useState, useEffect } from 'react';
import AuthService from '../services/api';

const TaskForm = ({ onSubmit, buttonText, initialTask }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialTask) {
      setDescription(initialTask.description || '');
    }
  }, [initialTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialTask) {
        // Update existing task
        const response = await AuthService.updateTask(initialTask._id, { description });
        console.log('Task updated successfully:', response.data);
      } else {
        // Create a new task
        const response = await AuthService.postTask({ description });
        console.log('Task created successfully:', response.data);
      }

      onSubmit(); // Trigger a reload or update of the task list after submitting
    } catch (error) {
      console.error('Error submitting task:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default TaskForm;
