import axios from 'axios';
import getCsrfToken from './csrfToken';

const logout = () => {
    const csrfToken = getCsrfToken();
    const config = {
        headers: {'X-CSRFToken': csrfToken},
        withCredentials: true // Ensure cookies are sent with the request
    };

    return axios.post('http://127.0.0.1:8000/api/logout/', {}, config);
};

const login = async (username, password) => {
    const csrfToken = getCsrfToken();
    const postData = {
        username,
        password,
    };
    const config = {
        headers: {'X-CSRFToken': csrfToken},
        withCredentials: true // Ensure cookies are sent with the request
    };

    // Attempt to login
    const loginResponse = await axios.post('http://127.0.0.1:8000/api/login/', postData, config);
    
    // After successful login, I fetch user roles
    const rolesResponse = await axios.get('http://127.0.0.1:8000/api/user-roles/', { withCredentials: true });
    if (rolesResponse.data) {
        // I Store roles in local storage 
        localStorage.setItem('userRoles', JSON.stringify(rolesResponse.data.roles));
    }

    return loginResponse;
};




export default {
    login,
    logout,
};
