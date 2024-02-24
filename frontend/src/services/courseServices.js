import axios from 'axios'
import getCsrfToken from './csrfToken';



const baseURL = 'http://127.0.0.1:8000/api/courses/'

const csrfToken = getCsrfToken();
const config = {
    headers: {'X-CSRFToken': csrfToken}
};


const getAll = () => {
    return axios.get(baseURL)
}

const getDetail = (id) => {
    return axios.get(`${baseURL}${id}/`)
}

const insert = (resource) => {    
    return axios.post(baseURL, resource, config)
}

const update = (url,  newNote) => {
    return axios.put(url, newNote)
}

const destroy = (url) => {
    return axios.delete(url)
}

export default {
    getAll: getAll,
    insert: insert, 
    update: update, 
    destroy: destroy, 
    getDetail: getDetail
}
