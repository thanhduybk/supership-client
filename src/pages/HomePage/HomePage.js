import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './HomePage.scss';

class HomePage extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    render() {


        return (
            <div className="home-container">
                Home Page
            </div>
        );
    }
}

HomePage.propTypes = {};

export default connect(null)(HomePage)