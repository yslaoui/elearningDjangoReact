function getCsrfToken() {
    let csrfToken = null;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith('csrftoken=')) {
            csrfToken = trimmedCookie.substring('csrftoken='.length);
            break;
        }
    }
    return csrfToken;
 }
 
 
 export default getCsrfToken