import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreatePost from "./components/Posts/CreatePost";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import { Link } from "react-router-dom";
import UpdatePost from "./components/Posts/UpdatePost";
import PostsList from "./components/Posts/PostsList";
import Home from "./components/Home/Home";
import PostDetails from "./components/Posts/PostDetails";
function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/posts" />
        <Route element={<PostDetails />} path="/posts/:postId" />
        <Route element={<UpdatePost />} path="/posts/:postId" />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
