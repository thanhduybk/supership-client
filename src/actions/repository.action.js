import * as api from '../api/repository.api';
import {requestCompleted, requestFailure, requestPending} from "./action.creators";

export const CREATE_REPOSITORY_PENDING = 'Create repository pending';
export const CREATE_REPOSITORY_SUCCESS = 'Create repository success';
export const CREATE_REPOSITORY_FAILURE = 'Create repository failure';

export const GET_ALL_REPOSITORIES_PENDING = 'Get all repositories pending';
export const GET_ALL_REPOSITORIES_SUCCESS = 'Get all repositories success';
export const GET_ALL_REPOSITORIES_FAILURE = 'Get all repositories failure';

export const GET_ONE_REPOSITORY_PENDING = 'Get one repository pending';
export const GET_ONE_REPOSITORY_SUCCESS = 'Get one repository success';
export const GET_ONE_REPOSITORY_FAILURE = 'Get one repository failure';

export const UPDATE_ONE_REPOSITORY_PENDING = 'Update repository pending';
export const UPDATE_ONE_REPOSITORY_SUCCESS = 'Update repository success';
export const UPDATE_ONE_REPOSITORY_FAILURE = 'Update repository failure';

export const DELETE_ONE_REPOSITORY_PENDING = 'Delete one repository pending';
export const DELETE_ONE_REPOSITORY_SUCCESS = 'Delete one repository pending';
export const DELETE_ONE_REPOSITORY_FAILURE = 'Delete one repository failure';

export function create(
    name,
    phone,
    contact,
    address,
    ward,
    district,
    province,
    main_repo
) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(CREATE_REPOSITORY_PENDING));
            const data = await api.create(name, phone, contact, address, ward, district, province, main_repo);
            dispatch(requestCompleted(CREATE_REPOSITORY_SUCCESS, data));
            return true;
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(CREATE_REPOSITORY_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            return false;
        }
    }
}

export function all() {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_ALL_REPOSITORIES_PENDING));
            const {data} = await api.all();
            dispatch(requestCompleted(GET_ALL_REPOSITORIES_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_ALL_REPOSITORIES_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function one(id) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(GET_ONE_REPOSITORY_PENDING));
            const {data} = await api.one(id);
            dispatch(requestCompleted(GET_ONE_REPOSITORY_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(GET_ONE_REPOSITORY_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function update(
    id,
    name,
    phone,
    contact,
    address,
    ward,
    district,
    province,
    main_repo) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(UPDATE_ONE_REPOSITORY_PENDING));
            const { data } = api.update(id, name, phone, contact, address, ward, district, province, main_repo);
            dispatch(requestCompleted(UPDATE_ONE_REPOSITORY_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(UPDATE_ONE_REPOSITORY_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}

export function destroy(id) {
    return async (dispatch) => {
        try {
            dispatch(requestPending(DELETE_ONE_REPOSITORY_PENDING));
            const { data } = api.destroy(id);
            dispatch(requestCompleted(DELETE_ONE_REPOSITORY_SUCCESS, data));
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                dispatch(requestFailure(DELETE_ONE_REPOSITORY_FAILURE, err.response.data))
            } else if (err.request) { // No response was received
                console.log(err.request);
            } else { // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
        }
    }
}