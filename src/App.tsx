import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlogPage from "./Components/Pages/BlogPage/BlogPage";
import PostPage from "./Components/Pages/PostPage/PostPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
