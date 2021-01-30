import axios from 'axios';

export const getUserByToken = async (token) => {
    try {
        return await axios.get("http://localhost:3000/user/" + token);
    } catch (e) {
        console.log(e);
    }
};