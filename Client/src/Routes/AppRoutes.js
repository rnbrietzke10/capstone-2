import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/lakes" element={} />
      <Route path="/rivers" element={} />
      <Route path="/signup" element={<SignUpFrom />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/profile" element={<UserProfile />} /> */}
    </Routes>
  );
};

export default AppRoutes;
