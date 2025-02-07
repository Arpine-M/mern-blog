import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreatePost from "./components/Posts/CreatePost";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import { Link } from "react-router-dom";
import UpdatePost from "./components/Posts/UpdatePost";
import PostsList from "./components/Posts/PostsList";
import Home from "./components/Home/Home";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import {useDispatch, useSelector} from "react-redux";
import { checkAuthStatusAPI } from "./APIServices/users/usersAPI";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "./redux/slices/authSlices";
import AuthRoute from "./components/AuthRoute/AuthRoute";

function App() {
  const {isError, isLoading, data, error, isSuccess, refetch} = useQuery({
    queryKey:["user-auth"],
    queryFn: checkAuthStatusAPI

  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  },[data]);
  const { userAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>

      {userAuth?<PrivateNavbar/>:<PublicNavbar/>}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<CreatePost />} path="/create-post" />
        <Route element={<PostsList />} path="/posts" />
        <Route element={<PostDetails />} path="/posts/:postId" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register/>} path="/register" />
        <Route element={<AuthRoute><Profile/></AuthRoute> } path="/profile" />



        <Route element={<UpdatePost />} path="/posts/:postId" />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
