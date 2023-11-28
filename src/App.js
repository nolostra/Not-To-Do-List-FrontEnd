import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Switch and Navigate
import Login from './component/Login';
import TaskList from './component/TaskList';
import Register from './component/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/register" element={<Register />} />
      {/* Add more routes for other components */}
      <Route path="/*" element={<Navigate to="/login" />} /> {/* Redirect to /login for unknown routes */}
    </Routes>
  );
};

export default App;
