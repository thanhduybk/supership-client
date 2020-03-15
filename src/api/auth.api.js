import Axios from "axios";
import {AUTH_URL} from "../constants/api";

export const login = (emailOrPhone, password) => {
    return Axios.post(`${AUTH_URL}/login`, {emailOrPhone, password});
};

export const logout = () => {
    const token = localStorage.getItem('token');
    return Axios.get(`${AUTH_URL}/logout`, {
        headers: {
            'Authorization': token
        }
    });
};

export const register = (shop, name, email, phone, password, referral_code = null) => {
    return Axios.post(`${AUTH_URL}/register`, {
        shop,
        name,
        email,
        phone,
        password,
        referral_code
    });
};

export const getMe = () => {
    const token = localStorage.getItem('token');
    return Axios.get(`${AUTH_URL}/me`, {
        headers: {
            'Authorization': token
        }
    });
};