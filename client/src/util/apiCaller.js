import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('jwtToken');

export default async (endpoint, method = 'get', body) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${API_URL}/${endpoint}`, {
        headers,
        method,
        body: JSON.stringify(body),
    })
        .then(response => {
            if (!response.ok) {
                // Redirect to the login page when Status:  401 Unauthorized is received
                if (response.status === 401) {
                    alert("Your session has expired, so you need to login again. Come on!")
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('username');
                    return window.location.href = '/login'; // Change '/login' to the actual login page URL
                }
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('API Error:', error);
            return Promise.reject(error);
        });
};
