import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/comments';
export const createCommentAPI = async(data)=>{
    const response = await axios.post(`${BASE_URL}/create`,
        data,
        {
            withCredentials: true}
    );
    return response.data
};


export const fetchCategoriesAPI = async() => {
    const posts = await axios.get(BASE_URL);
    return posts.data;
}



