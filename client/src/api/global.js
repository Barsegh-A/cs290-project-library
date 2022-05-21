import axiosInstance from "../config/axiosInstance";

export function login(payload) {
    return axiosInstance.post(`/signin`, payload)
}

export function register(payload) {
    return axiosInstance.post(`/signup`, payload)
}