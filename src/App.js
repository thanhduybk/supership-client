import React from 'react';
import './App.css';
import Router from './routes';
import {connect} from "react-redux";
import {getMe} from "./actions/auth.action";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    UNSAFE_componentWillMount() {
        this.props.getMe().then(() => this.setState({loading: false}));
    }

    render() {
        const {authenticated} = this.props;
        const {loading} = this.state;

        return (
            loading ? null : <Router authenticated={authenticated} />
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.authReducer.authenticated
});

const mapDispatchToProps = dispatch => ({
    getMe: () => dispatch(getMe())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
