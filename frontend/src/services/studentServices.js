import axios from 'axios'
import getCsrfToken from './csrfToken';
const baseURL = 'http://127.0.0.1:8000/api/students'
const createImageURL = 'http://127.0.0.1:8000/api/createImage/'
const currentStudentURL = 'http://127.0.0.1:8000/api/current_student/'; // Add this line

const insertFile = (formData) => {
    return axios.post(createImageURL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const getAll = () => {
    return axios.get(baseURL)
}

const getDetail = (id) => {
    return axios.get(`${baseURL}/${id}/`)
}

const insert = (resource) => {
    return axios.post(baseURL, resource)
}

const update = (url,  newNote) => {
    return axios.put(url, newNote)
}

const destroy = (url) => {
    return axios.delete(url)
}

const getCurrentStudent = () => {
    // with credentials sends cookies to persist user between sessions
    return axios.get(currentStudentURL, { withCredentials: true });
  };


export default {
    getAll: getAll,
    insert: insert, 
    update: update, 
    destroy: destroy, 
    getDetail: getDetail, 
    insertFile: insertFile, 
    getCurrentStudent:getCurrentStudent
}
