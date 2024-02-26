// registrationService.js
import axios from 'axios';
import getCsrfToken from './csrfToken';


const register = (userData) => {
    const csrfToken = getCsrfToken();
    const config = {
        headers: {'X-CSRFToken': csrfToken}
    };

    return axios.post('http://127.0.0.1:8000/api/register/', userData, config);
};

export default {
    register,
};
