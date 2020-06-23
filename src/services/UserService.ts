import axios from 'axios';
const config = require('../config.json');

export const userService = {
    login,
    logout,
    authHeader,
    getUser
};

function authHeader(): {Authorization: string} | null {
    const auth = localStorage.getItem('auth');
    const stored: {user: string, password: string} = auth ? JSON.parse(auth): null;

    if (stored) {
        return { 'Authorization': 'Basic ' + btoa(stored.user + ':' + stored.password) };
    } else {
        logout();
        return null;
    }
}

function getUser(): string | null {
    const auth = localStorage.getItem('auth');
    const stored: {user: string, password: string} = auth ? JSON.parse(auth): null;

    if (stored) {
        return stored.user
    } else {
        logout();
        return null;
    }
}

function login(user?: string, password?: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const auth_header = authHeader();
        let headers = null;
        if (user && password) {
            headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(user + ':' + password)};
        } else if (auth_header){
            headers = { 'Content-Type': 'application/json', 'Authorization': auth_header.Authorization};
        } else {
            logout();
            resolve(false)
        }

        return axios.get(config.url + `/ok`, {headers})
            .then(() => {
                if (user && password) localStorage.setItem('auth', JSON.stringify({user, password}));
                resolve(true)
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    alert('incorrect username-password');
                    logout();
                    resolve(false)
                } else {
                    alert(`error: ${err.response ? err.response.status:err}`);
                    resolve(false)
                }
            });
    })
}

function logout() {
    localStorage.removeItem('auth');
    if (!(window.location.pathname === '/login')) window.location.href = '/login'
}
