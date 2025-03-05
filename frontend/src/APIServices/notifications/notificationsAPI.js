import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/notifications";


export const fetchNotificationsAPI = async (postData) => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};


export const readNotificationAPI = async (notificationId) => {
  const posts = await axios.put(`${BASE_URL}/${notificationId}`, {});
  return posts.data;
};

