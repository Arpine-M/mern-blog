import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/posts/create';
export const createPostAPI = async(postData)=>{
    const response = await axios.post(BASE_URL, {
        title:postData.title,
        description:postData.description
    });
    return response.data

}