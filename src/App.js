import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Switch and Navigate
import Login from './component/Login';
import TaskList from './component/TaskList';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<TaskList />} />
      {/* Add more routes for other components */}
      <Route path="/*" element={<Navigate to="/login" />} /> {/* Redirect to /login for unknown routes */}
    </Routes>
  );
};

export default App;
