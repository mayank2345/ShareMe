export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefine' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();


    return userInfo
}