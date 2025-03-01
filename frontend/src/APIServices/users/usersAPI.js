import axios from "axios";
import { BASE_URL } from "../../utils/baseEndpoint";

export const registerAPI = async (userData) => {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      {
        username: userData?.username,
        password: userData?.password,
        email: userData?.email,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };
  // ! login user
export const loginAPI = async (userData) => {
    const response = await axios.post(
      `${BASE_URL}/users/login`,
      {
        username: userData?.username,
        password: userData?.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const checkAuthStatusAPI = async () => {
    const response = await axios.get(
      `${BASE_URL}/users/checkAuthenticated`,
      
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const userProfileAPI = async () => {
    const response = await axios.get(
      `${BASE_URL}/users/profile`,
      
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const logoutAPI = async (userData) => {
    const response = await axios.post(
      `${BASE_URL}/users/logout`,
      {
        
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const followUserAPI = async (userId) => {
    const response = await axios.put(
      `${BASE_URL}/users/follow/${userId}`,
      {},
      {
        username: userData?.username,
        password: userData?.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };


  export const unfollowUserAPI = async (userId) => {
    const response = await axios.put(
      `${BASE_URL}/users/unfollow/${userId}`,
      {},
      {
        username: userData?.username,
        password: userData?.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const sendEmailVerificationTokenAPI = async () => {
    const response = await axios.put(
      `${BASE_URL}/users/account-verification-email`,
      {},
      {
        username: userData?.username,
        password: userData?.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const verifyUserAccountAPI = async (verifyToken) => {
    const response = await axios.put(
      `${BASE_URL}/users/verify-account/${verifyToken}`,
      {},
      {
        username: userData?.username,
        password: userData?.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };


  export const forgotPasswordAPI = async (email) => {
    const response = await axios.post(
      `${BASE_URL}/users/forgot-password/`,
      {
        email,
      },
     
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };

  export const resetPasswordAPI = async (data) => {
    const response = await axios.post(
      `${BASE_URL}/users/reset-password/${data?.verifyToken}`,
      
      {
        
        password: data?.password,
      },
      {
        withCredentials: true,
      }
    );
  
    return response.data;
  };



