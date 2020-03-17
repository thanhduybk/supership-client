import React, {Component} from 'react';
import {connect} from "react-redux";
import './HomePage.scss';
import {getMe} from "../../actions/auth.action";

class HomePage extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="home-container">
                Home Page
            </div>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    getMe: () => dispatch(getMe())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);