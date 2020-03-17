import React, {Component, Fragment} from 'react';
import './Header.scss';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Avatar, Icon, Menu} from "antd";
import {logout} from "../../actions/auth.action";

const {SubMenu} = Menu;

class Header extends Component {

    onSelect = ({item, key, keyPath, selectedKeys}) => {
        
    };

    render() {
        const {user} = this.props;

        return (
            <Menu mode="horizontal" id="menu" onSelect={this.onSelect}>
                {/*Left menu*/}
                <Menu.Item key="send">
                    <Icon type="message"/>
                    Send Request
                </Menu.Item>
                <Menu.Item key="create">
                    <Link to="/orders/create" style={{textDecoration: "none", color: "#fff"}}>
                        <Icon type="scan"/>
                        Create Order
                    </Link>
                </Menu.Item>
                <Menu.Item key="download">
                    <Icon type="download"/>
                    Download Order
                </Menu.Item>
                {/*Right menu*/}
                <SubMenu
                    key="me"
                    style={{float: 'right', paddingLeft: 0}}
                    title={
                        <Fragment>
                            <Avatar style={{backgroundColor: '#b94a48', verticalAlign: 'middle',}} size="medium">
                                {user.email.charAt(0).toUpperCase()}
                            </Avatar>
                            <span style={{marginLeft: 16}}>{user.email}</span>
                        </Fragment>
                    }
                >
                    <Menu.Item onClick={this.props.logout}>
                        Logout
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="android" style={{float: 'right'}}>
                    <Icon type="android"/>
                    Android
                </Menu.Item>
                <Menu.Item key="ios" style={{float: 'right'}}>
                    <Icon type="apple"/>
                    iOS
                </Menu.Item>
            </Menu>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));