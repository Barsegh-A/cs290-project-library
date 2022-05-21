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
        }
    }
)

const token = localStorage.getItem('access_token')

if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default axiosInstance