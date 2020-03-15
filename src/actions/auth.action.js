import * as api from "../api/auth.api";
import axios from "axios";

export const LOGIN_PENDING = 'Login pending';
export const LOGIN_SUCCESS = 'Login success';
export const LOGIN_FAILED = 'Login failed';

export const LOGOUT = 'Logout';
export const LOGOUT_SUCCESS = 'Logout success';
export const LOGOUT_FAILED = 'Logout failed';

export const GET_ME_PENDING = 'Get me pending';
export const GET_ME_SUCCESS = 'Get me success';
export const GET_ME_FAILED = 'Get me failed';

export const REGISTER_PENDING = 'Register pending';
export const REGISTER_SUCCESS = 'Register success';
export const REGISTER_FAILED = 'Register failed';

function processLogin() {
    return {
        type: LOGIN_PENDING
    }
}

/**
 * @param data
 * */
function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}

function processLogout() {
    return {
        type: LOGOUT
    }
}

function logoutSuccess(data) {
    return {
        type: LOGOUT_SUCCESS,
        payload: data
    }
}

function logoutFailure(error) {
    return {
        type: LOGOUT_FAILED,
        payload: error
    }
}

function processGetMe() {
    return {
        type: GET_ME_PENDING
    }
}

function getMeSuccess(data) {
    return {
        type: GET_ME_SUCCESS,
        payload: data
    }
}

function getMeFailure(error) {
    return {
        type: GET_ME_FAILED,
        payload: error
    }
}

function processRegister() {
    return {
        type: REGISTER_PENDING
    }
}

function registerSuccess(data) {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

function registerFailure(error) {
    return {
        type: REGISTER_FAILED,
        payload: error
    }
}

export function login(emailOrPhone, password) {
    return async (dispatch) => {
        try {
            dispatch(processLogin());
            const { data } = await api.login(emailOrPhone, password);
            localStorage.setItem('token', `Bearer ${data.result.token}`);
            dispatch(loginSuccess(data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(loginFailure(err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            dispatch(processLogout());
            const { data } = await api.logout();
            localStorage.setItem('token', null);
            dispatch(logoutSuccess(data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(loginFailure(err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function register(shop, name, email, phone, password, referral_code) {
    return async (dispatch) => {
        try {
            dispatch(processRegister());
            const { data } = await api.register(shop, name, email, phone, password, referral_code);
            dispatch(registerSuccess(data));
            return true;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(registerFailure(err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            return false;
        }
    }
}

export function getMe() {
    return async (dispatch) => {
        try {
            dispatch(processGetMe());
            const { data } = await api.getMe();
            dispatch(getMeSuccess(data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(getMeFailure(err.response.data));
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}