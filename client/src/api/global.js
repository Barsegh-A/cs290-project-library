import axios from "axios";

export function login(payload) {
    return axios.post(`${process.env.API_URL}/login`, payload)
}