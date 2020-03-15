import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
    <Route
        {...rest}
        render={() => (authenticated ? <Component authenticated={authenticated} {...rest} /> : <Redirect to="/login"/>)}
    />
);

function WebRouter({authenticated}) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <PrivateRoute exact path="/" component={HomePage} authenticated={authenticated}/>
                <Route component={NotFoundPage} authenticated={authenticated}/>
            </Switch>
        </BrowserRouter>
    )
}

export default WebRouter;
