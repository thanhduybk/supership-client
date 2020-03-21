import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MainLayout from "./components/MainLayout";
import OrderCreationPage from "./pages/OrderCreationPage/OrderCreationPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";

const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
    <Route render={
        props => authenticated ? <Component {...props} authenticated={authenticated} /> : <Redirect to='/login'/>
    }/>
);

function WebRouter(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>

                <MainLayout>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} authenticated={props.authenticated} />
                        <PrivateRoute exact path="/orders" component={OrdersPage} authenticated={props.authenticated} />
                        <PrivateRoute exact path="/orders/create" component={OrderCreationPage} authenticated={props.authenticated} />
                    </Switch>
                </MainLayout>

                <Route component={NotFoundPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default WebRouter;
