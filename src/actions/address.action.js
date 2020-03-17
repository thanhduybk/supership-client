import * as api from '../api/address.api';
import {requestCompleted, requestFailure, requestPending} from "./action.creators";

export const GET_PROVINCES_PENDING = 'Get provinces pending';
export const GET_PROVINCES_SUCCESS = 'Get provinces success';
export const GET_PROVINCES_FAILURE = 'Get provinces failure';

export const GET_DISTRICTS_PENDING = 'Get districts pending';
export const GET_DISTRICTS_SUCCESS = 'Get districts success';
export const GET_DISTRICTS_FAILURE = 'Get districts failure';

export const GET_WARDS_PENDING = 'Get wards pending';
export const GET_WARDS_SUCCESS = 'Get wards success';
export const GET_WARDS_FAILURE = 'Get wards failure';

export function allProvinces() {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_PROVINCES_PENDING));
            const { data } = await api.allProvinces();
            dispatch(requestCompleted(GET_PROVINCES_SUCCESS, data));
            return data.result;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_PROVINCES_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            return [];
        }
    }
}

export function allDistricts(province) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_DISTRICTS_PENDING));
            const { data } = await api.allDistricts(province);
            dispatch(requestCompleted(GET_DISTRICTS_SUCCESS, data));
            return data.result;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_DISTRICTS_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            return [];
        }
    }
}

export function allWards(province, district) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_WARDS_PENDING));
            const { data } = await api.allWards(province, district);
            dispatch(requestCompleted(GET_WARDS_SUCCESS, data));
            return data.result;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_WARDS_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            return [];
        }
    }
}