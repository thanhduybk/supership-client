import thunk from "redux-thunk";
import logger from "redux-logger";
import {applyMiddleware, compose, createStore} from "redux";
import reducers from './reducers';

let middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
    middleware.push(logger);
}

let enhancers = [applyMiddleware(...middleware)];

const store = createStore(reducers, compose(...enhancers));

export default store;