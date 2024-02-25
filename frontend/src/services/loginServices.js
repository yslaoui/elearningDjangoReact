import axios from 'axios';
import getCsrfToken from './csrfToken';

const login = (username, password) => {
    const csrfToken = getCsrfToken();
    // Data to be sent in the POST request
    const postData = {
        username,
        password,
    };
    const config = {
        headers: {'X-CSRFToken': csrfToken}
    };

    return axios.post('http://127.0.0.1:8000/api/login/', postData, config);
};

export default {
    login,
};
