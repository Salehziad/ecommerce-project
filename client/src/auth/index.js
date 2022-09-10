import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = async(user) => {
    return await fetch(`http://localhost:5000/api/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {

        return response.json();
    }).catch(err => {
        console.log(err);
    })
}

export const authenticate = (data, next) => {
        cookies.set('data', data, {path: '/'});
        next();
};

export const signout = next => {
    cookies.remove('data',{ path: '/' })
    window.location.reload();

};

export const isAuthenticated = () => {
    if (cookies.get('data') == 'undefined') {
        return false;
    }
    if (cookies.get('data')) {
        return cookies.get('data');
    } else {
        return false;
    }
};
