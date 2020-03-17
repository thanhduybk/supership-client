import {
    GET_ALL_REPOSITORIES_FAILURE,
    GET_ALL_REPOSITORIES_PENDING,
    GET_ALL_REPOSITORIES_SUCCESS
} from "../actions/repository.action";

const initState = {
    pending: false,
    message: '',
    repositories: []
};

export default function repositoryReducer(state = initState, action) {
    switch (action.type) {
        case GET_ALL_REPOSITORIES_PENDING:
            return {...state, pending: true};
        case GET_ALL_REPOSITORIES_SUCCESS:
            return {...state, pending: false, repositories: action.payload.result};
        case GET_ALL_REPOSITORIES_FAILURE:
            return {...state, pending: false, message: action.payload.message};
        default:
            return state;
    }
}