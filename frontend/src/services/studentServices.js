import axios from 'axios'
const baseURL = 'http://127.0.0.1:8000/api/students'
const createImageURL = 'http://127.0.0.1:8000/api/createImage/'

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
    return axios.get(`${baseURL}/${id}`)
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

export default {
    getAll: getAll,
    insert: insert, 
    update: update, 
    destroy: destroy, 
    getDetail: getDetail, 
    insertFile: insertFile
}
