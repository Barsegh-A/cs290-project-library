import axiosInstance from "../config/axiosInstance";

export function getBooks() {
    return axiosInstance.get(`/books`)
}