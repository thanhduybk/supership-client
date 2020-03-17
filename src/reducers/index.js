import authReducer from "./auth.reducer";
import {combineReducers} from "redux";
import repositoryReducer from "./repository.reducer";

const root = combineReducers({
    authReducer,
    repositoryReducer
});

export default root;