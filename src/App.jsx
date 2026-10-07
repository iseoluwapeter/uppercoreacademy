import React from "react";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import CourseDetailsPage from "./pages/CourseDetails.Page";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
