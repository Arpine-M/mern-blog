import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/posts';
export const createPostAPI = async(postData)=>{
    const response = await axios.post(`${BASE_URL}/create`, {
        title:postData.title,
        description:postData.description
    });
    return response.data
};

export const updatePostAPI = async (postData) => {
    console.log(postData);
    const response = await axios.put(`${BASE_URL}/${postData?.postId}`, {
      title: postData.title,
      description: postData.description,
    });
    return response.data;
  };
export const fetchAllPosts = async() => {
    const posts = await axios.get(BASE_URL);
    return posts.data;
}

export const fetchPost = async(postId) => {
    const posts = await axios.get(`${BASE_URL}/${postId}`);
    return posts.data;
}

export const deletePostAPI = async (postId) => {
    const posts = await axios.delete(`${BASE_URL}/${postId}`);
    return posts.data;
  };