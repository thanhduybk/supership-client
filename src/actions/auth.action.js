import * as api from "../api/auth.api";
import {requestCompleted, requestFailure, requestPending} from "./action.creators";

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

export function login(emailOrPhone, password) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(LOGIN_PENDING));
            const { data, status } = await api.login(emailOrPhone, password);
            localStorage.setItem('token', `Bearer ${data.result.token}`);
            dispatch(requestCompleted(LOGIN_SUCCESS, data));
            return status;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(LOGIN_FAILED, err.response.data));
                return err.response.status;
            } else if (err.request) { // No response was received
                console.log(err.request);
                return 500;
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
                return 500;
            }

        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            dispatch(requestPending(LOGOUT));
            const { data } = await api.logout();
            localStorage.setItem('token', null);
            dispatch(requestCompleted(LOGOUT_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(LOGOUT_FAILED, err.response.data))
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
            dispatch(requestPending(REGISTER_PENDING));
            const { data } = await api.register(shop, name, email, phone, password, referral_code);
            dispatch(requestCompleted(REGISTER_SUCCESS, data));
            return true;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(REGISTER_FAILED, err.response.data))
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
            dispatch(requestPending(GET_ME_PENDING));
            const { data } = await api.getMe();
            dispatch(requestCompleted(GET_ME_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_ME_FAILED, err.response.data));
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}