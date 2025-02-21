import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/plans';
export const createPlanAPI = async(planData)=>{
    const response = await axios.post(`${BASE_URL}/create`,
        postData,
        {
            withCredentials: true}
    );
    return response.data
};


export const fetchPlansAPI = async() => {
    const plans = await axios.get(BASE_URL);
    return plans.data;
}

export const fetchPlanAPI = async(id) => {
    const plan = await axios.get(`${BASE_URL}/${id}`);
    return plan.data;
}


