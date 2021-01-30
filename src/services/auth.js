import axios from 'axios';

export const login = async (email, password) => {
    try {
        return await axios.post("http://149881bfa29a.ngrok.io/login", {email, password});
    } catch (e) {
        console.log(e);
    }
};

export const register = async (name, phone, email, password) => {
    try {
        console.log(name, phone, email, password);
        return await axios.post("http://149881bfa29a.ngrok.io/register", {name, phone, email, password});
    } catch (e) {
        console.log(e);
    }
};