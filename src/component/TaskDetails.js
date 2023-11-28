import React from 'react';

const TaskDetails = ({ task }) => {
  return (
    <div>
      <h2>Task Details</h2>
      <p>Description: {task.description}</p>
    </div>
  );
};

export default TaskDetails;
