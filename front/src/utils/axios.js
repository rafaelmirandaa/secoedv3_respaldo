 import axios from 'axios';

 const axiosServices = axios.create(
        {
            baseURL: 'http://127.0.0.1:5000',
        }
 );
 
 // interceptor for http
 axiosServices.interceptors.response.use(
     (response) => response,
     (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
     
 );
 

 axiosServices.defaults.headers.common['x-api-key'] = '1f5cQ3ZRmD2HvBN9kXZ0v7tmx0NJTV4lG2U9o1JHD7k';


 export default axiosServices;
 