import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/earnings';



export const fetchAllEarningsAPI = async() => {
    const posts = await axios.get(BASE_URL);
    return posts.data;
}

export const getMyEarningsAPI = async() => {
    const posts = await axios.get(`${BASE_URL}/my-earnings`, {
        withCredentials: true
    });
    return posts.data;
}



