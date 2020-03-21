import * as api from '../api/order.api';
import {requestCompleted, requestFailure, requestPending} from "./action.creators";
import Papa from 'papaparse'

export const GET_ALL_ORDERS_PENDING = 'Get all orders pending';
export const GET_ALL_ORDERS_SUCCESS = 'Get all orders success';
export const GET_ALL_ORDERS_FAILED = 'Get all orders failed';

export const GET_ONE_ORDER_PENDING = 'Get one order pending';
export const GET_ONE_ORDER_SUCCESS = 'Get one order success';
export const GET_ONE_ORDER_FAILED = 'Get one order failure';

export const CREATE_ORDER_PENDING = 'Create order pending';
export const CREATE_ORDER_SUCCESS = 'Create order success';
export const CREATE_ORDER_FAILED = 'Create order failure';

export const UPDATE_ORDER_PENDING = 'Update order pending';
export const UPDATE_ORDER_SUCCESS = 'Update order success';
export const UPDATE_ORDER_FAILED = 'Update order failure';

export const DELETE_ORDER_PENDING = 'Delete order pending';
export const DELETE_ORDER_SUCCESS = 'Delete order success';
export const DELETE_ORDER_FAILED = 'Delete order failure';

export const UPLOAD_ORDERS_PENDING = 'Upload orders pending';
export const UPLOAD_ORDERS_SUCCESS = 'Upload orders success';
export const UPLOAD_ORDERS_FAILED = 'Upload orders failed';

export function getOrders() {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_ALL_ORDERS_PENDING));
            const {data} = await api.all();
            dispatch(requestCompleted(GET_ALL_ORDERS_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_ALL_ORDERS_FAILED, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function getOrder(id) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_ONE_ORDER_PENDING));
            const {data} = await api.one(id);
            dispatch(requestCompleted(GET_ONE_ORDER_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_ONE_ORDER_FAILED, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function createOrder(product, receiver, address, wardId, repositoryId, moneyTaking) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(CREATE_ORDER_PENDING));
            const {data, status} = await api.create(product, receiver, address, wardId, repositoryId, parseInt(moneyTaking));
            dispatch(requestCompleted(CREATE_ORDER_SUCCESS, data));
            return status;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(CREATE_ORDER_FAILED, err.response.data));
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

export function updateOrder(id, product, receiver, address, wardId, repositoryId, moneyTaking = 0) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(UPDATE_ORDER_PENDING));
            const {data, status} = await api.update(id, product, receiver, address, wardId, repositoryId, moneyTaking);
            dispatch(requestCompleted(UPDATE_ORDER_SUCCESS, data));
            return status;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(UPDATE_ORDER_FAILED, err.response.data));
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

export function destroyOrder(id) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(DELETE_ORDER_PENDING));
            const {data, status} = await api.destroy(id);
            dispatch(requestCompleted(DELETE_ORDER_SUCCESS, data));
            return status;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(DELETE_ORDER_FAILED, err.response.data));
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

export function uploadOrders(file) {
    const orders = Papa.parse(file);
    console.log(orders);
    // return async dispatch => {
    //     try {
    //         dispatch(UPLOAD_ORDERS_PENDING);
    //         const orders = await Papa.parse(file);
    //         console.log(orders);
    //         dispatch(UPLOAD_ORDERS_SUCCESS, orders);
    //     } catch (err) {
    //         if (err.response) {
    //             console.log(err.response.data);
    //             dispatch(requestFailure(UPLOAD_ORDERS_FAILED, err.response.data));
    //             return err.response.status;
    //         } else if (err.request) { // No response was received
    //             console.log(err.request);
    //             return 500;
    //         } else { // Something happened in setting up the request that triggered an Error
    //             console.log('Error', err.message);
    //             return 500;
    //         }
    //     }
    // }
}