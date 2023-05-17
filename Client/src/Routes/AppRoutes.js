import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Location from '../pages/Location/Location';
import UserProfile from '../pages/UserProfile/UserProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/lakes/:lake" element={<Location />} />
      <Route path="/rivers/:river" element={<Location />} />
      <Route path="/users/:username" element={<UserProfile />} />
    </Routes>
  );
};

export default AppRoutes;
