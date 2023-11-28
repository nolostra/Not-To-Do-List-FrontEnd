import React, { useEffect, useState, useContext } from 'react';
import AuthService from '../services/api';
import TaskForm from './TaskForm';
import { UserContext } from '../contexts/UserContext';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await AuthService.getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await AuthService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      console.log('Task deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      // Assuming you have an `updateTask` function in your AuthService or another service
      const response = await AuthService.updateTask(updatedTask);
      
      // Update the task in the local state
      setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));

      console.log('Task updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating task:', error.message);
    } finally {
      // Clear the selected task
      setSelectedTask(null);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {user && user.role === 'HR Admin' && (
        <TaskForm
          onSubmit={() => {
            setSelectedTask(null);
            // Reload or update the task list
          }}
          buttonText={selectedTask ? 'Update Task' : 'Add Task'}
          initialTask={selectedTask}
        />
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.description} - Priority: {task.priority} - Due Date: {task.dueDate}
            {user && user.role === 'HR Admin' && (
              <>
                <button onClick={() => handleUpdate(task)}>Update</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
