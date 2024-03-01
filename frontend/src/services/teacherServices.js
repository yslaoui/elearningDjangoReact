import axios from 'axios';
import getCsrfToken from './csrfToken';

const baseURL = 'http://127.0.0.1:8000/api/teachers';
const currentTeacherURL = 'http://127.0.0.1:8000/api/current_teacher/'; 

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
    },
    withCredentials: true, 
};

const getAllTeachers = () => {
    return axios.get(baseURL, config);
};

const getTeacherDetail = (id) => {
    return axios.get(`${baseURL}/${id}/`, config);
};

const getCurrentTeacher = () => {
    return axios.get(currentTeacherURL, { withCredentials: true });
  };

  const searchTeachers = (searchTerm) => {
    return axios.get(`${baseURL}?search=${searchTerm}`, config);
};


export default {
    getAllTeachers,
    getTeacherDetail,
    getCurrentTeacher,
    searchTeachers
};
