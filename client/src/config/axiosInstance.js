import axios from 'axios'

const axiosInstance = axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            changeOrigin: true,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            'Origin': process.env.REACT_APP_APP_URL
        }
    }
)

export default axiosInstance