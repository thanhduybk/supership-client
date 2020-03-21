import authReducer from "./auth.reducer";
import {combineReducers} from "redux";
import repositoryReducer from "./repository.reducer";
import orderReducer from "./order.reducer";

const root = combineReducers({
    authReducer,
    repositoryReducer,
    orderReducer
});

export default root;