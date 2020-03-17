import React from 'react';
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";
import './Breadcrumb.scss'

const Breadcrumbs = (props) => (
    <div id="breadcrumbs">
        <Breadcrumb id="breadcrumbs-elements">
            <Breadcrumb.Item>
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link to='/orders'>Orders</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Order</Breadcrumb.Item>
        </Breadcrumb>
        <hr />
    </div>
);

export default Breadcrumbs;