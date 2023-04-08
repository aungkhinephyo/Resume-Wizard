import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
  // Do something before request is sent
  const token = localStorage.getItem('TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
});

axiosClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status == 401) {
    localStorage.removeItem('TOKEN');
    window.location.reload();
    return error;
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  throw error;
});

export default axiosClient;


