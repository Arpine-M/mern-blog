import axios from "axios";
//create that must return a promise
const BASE_URL = "http://localhost:5000/api/v1/posts";

//!Create post api
export const createPostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, postData, {
    withCredentials: true,
  });
  return response.data;
};
//!update post api
export const updatePostAPI = async (postData) => {
  console.log(postData);
  const response = await axios.put(
    `${BASE_URL}/${postData?.postId}`,
    {
      title: postData.title,
      description: postData.description,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
//! Fetch all posts
export const fetchAllPosts = async (filters) => {
  console.log(filters);
  const posts = await axios.get(BASE_URL, {
    params: filters,
  });
  return posts.data;
};
//! Fetch  post
export const fetchPost = async (postId) => {
  const posts = await axios.get(`${BASE_URL}/${postId}`);
  return posts.data;
};
//! delete  post
export const deletePostAPI = async (postId) => {
  const posts = await axios.delete(`${BASE_URL}/${postId}`, {
    withCredentials: true,
  });
  return posts.data;
};