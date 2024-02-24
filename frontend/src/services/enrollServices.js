import axios from 'axios';
import getCsrfToken from './csrfToken';

const enrollStudentInCourse = (courseId, studentId) => {
    const csrfToken = getCsrfToken();
    // Data to be sent in the POST request
    const postData = {
        "student": parseInt(studentId, 10) ,
        "course":  parseInt(courseId, 10)
    };
    const config = {
        headers: {'X-CSRFToken': csrfToken}
    };
  
    return axios.post('http://127.0.0.1:8000/api/enrollments/', postData, config);
};

export default {
    enrollStudentInCourse,
};
