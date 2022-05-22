import axiosInstance from "../config/axiosInstance";

export function getBooks() {
    return axiosInstance.get(`/books`)
}

export function deleteBook(id) {
    return axiosInstance.delete(`/books/remove/${id}`)
}

export function createBook(payload) {
    return axiosInstance.post(`/books/add`, payload)
}

export function updateBook(payload, id) {
    return axiosInstance.patch(`/books/update/${id}`, payload)
}