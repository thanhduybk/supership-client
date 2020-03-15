import authReducer from "./auth.reducer";
import {combineReducers} from "redux";

const root = combineReducers({
    authReducer
});

export default root;