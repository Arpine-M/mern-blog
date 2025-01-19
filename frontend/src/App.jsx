import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/PostsList'
import PublicNavbar from './components/Navbar/PublicNavbar'
import HomePage from './components/Home/HomePage'
import {Link} from 'react-router-dom'
import UpdatePost from './components/Posts/UpdatePost'
function App() {
 

  return (
    <BrowserRouter>
    <PublicNavbar/>
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<CreatePost />} path="/create-post" />
      <Route element={<PostsList />} path="/lists" />
      <Route element={<UpdatePost />} path="/posts/:postId" />


     
    </Routes>
    </BrowserRouter>
  )
}

export default App
