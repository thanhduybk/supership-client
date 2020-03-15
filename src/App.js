import React from 'react';
import './App.css';
import Router from './routes';
import {getMe} from "./actions/auth.action";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.props.getMe();
    }

    render() {
        const {authenticated} = this.props;

        return (
            <Router authenticated={authenticated} />
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated
});

const mapDispatchToProps = dispatch => ({
    getMe: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
