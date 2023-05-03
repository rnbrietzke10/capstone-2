import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/lakes" element={} />
      <Route path="/rivers" element={} />
      <Route path="/signup" element={<SignUpFrom />} />
      
      <Route path="/profile" element={<UserProfile />} /> */}
    </Routes>
  );
};

export default AppRoutes;
