import {
    GET_ME_FAILED,
    GET_ME_PENDING, GET_ME_SUCCESS,
    LOGIN_FAILED,
    LOGIN_PENDING,
    LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILED, LOGOUT_SUCCESS,
    REGISTER_FAILED,
    REGISTER_PENDING,
    REGISTER_SUCCESS
} from "../actions/auth.action";

const initState = {
    authenticated: false,
    user: null,
    message: '',
    pending: false,
};

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN_PENDING:
        case REGISTER_PENDING:
        case GET_ME_PENDING:
        case LOGOUT:
            return {...state, pending: true};
        case LOGIN_SUCCESS:
            return {...state, pending: false, message: action.payload.message, authenticated: true};
        case LOGIN_FAILED:
            return {...state, pending: false, message: action.payload.message, authenticated: false};
        case REGISTER_SUCCESS:
        case REGISTER_FAILED:
            return {...state, pending: false, message: action.payload.message};
        case GET_ME_SUCCESS:
            return {...state, pending: false, message: action.payload.message, user: action.payload.result, authenticated: true};
        case GET_ME_FAILED:
            return {...state, pending: false, message: action.payload.message, user: null, authenticated: false};
        case LOGOUT_SUCCESS:
            return {...state, pending: false, message: action.payload.message, authenticated: false, user: null};
        case LOGOUT_FAILED:
            return {...state, pending: false, message: action.payload.message};
        default:
            return state;
    }
}

