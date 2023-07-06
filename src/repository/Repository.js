import axios from "axios"
const baseDomain = 'https://us-central1-course-platform-6bd85.cloudfunctions.net';
const baseURL = `${baseDomain}`;
const getToken = () => {
    let ls = JSON.parse(localStorage.getItem('authUser'));
    if (ls && ls.token != null) {
        return `Bearer ${ls.token}`;
    } else {
        return '';
    }
};
let axiosObj;
axiosObj = axios.create({
    baseURL,
    headers: {
        Authorization: getToken(),
    },
});
export default axiosObj;