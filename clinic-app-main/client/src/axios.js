import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials : false,
    headers : {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',  
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        const token = getToken();
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!!error.isAxiosError && !error.response) {
        throw new Error(`Unable to connect to network`);
      }
  
      if (error.response?.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  
  function getToken() {
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
    return token;
  }

