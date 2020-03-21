import {
    CREATE_ORDER_FAILED,
    CREATE_ORDER_PENDING, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAILED, DELETE_ORDER_SUCCESS,
    GET_ALL_ORDERS_FAILED,
    GET_ALL_ORDERS_PENDING,
    GET_ALL_ORDERS_SUCCESS, UPDATE_ORDER_FAILED, UPDATE_ORDER_SUCCESS
} from "../actions/order.action";

const initState = {
    pending: false,
    message: '',
    orders: []
};

export default function orderReducer(state = initState, action) {
    switch (action.type) {
        case GET_ALL_ORDERS_PENDING:
        case CREATE_ORDER_PENDING:
            return {...state, pending: true};

        case GET_ALL_ORDERS_FAILED:
        case CREATE_ORDER_FAILED:
        case UPDATE_ORDER_FAILED:
        case DELETE_ORDER_FAILED:
            return {...state, pending: false, message: action.payload.message};

        case GET_ALL_ORDERS_SUCCESS:
            return {...state, pending: false, orders: action.payload.result};
        case CREATE_ORDER_SUCCESS:
            return {...state, pending: false, orders: [action.payload.result, ...state.orders]};
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                pending: false,
                orders: state.orders.map(order => {
                    if (order.id !== action.payload.result.id) {
                        return order;
                    }
                    return {...order, ...action.payload.result};
                })
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                pending: false,
                orders: state.orders.filter(order => order.id !== action.payload.result)
            };

        default:
            return state;
    }
}