import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, notification, Icon, Checkbox} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/auth.action';
import './LoginPage.scss';

class LoginPage extends Component {
    handleSubmit = e => {
        const {form, login} = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                const {emailOrPhone, password} = values;
                login(emailOrPhone, password).then(() => {
                    if (this.props.authenticated) {
                        notification.success({
                            message: 'Success!',
                            description: this.props.message,
                        });
                        this.props.history.push('/');
                    } else {
                        notification.error({
                            message: 'Failed!',
                            description: this.props.message
                        });
                    }
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-container">
                <div className="logo">
                    <Link to="/">
                        <img
                            src="https://mysupership.vn/custom/img/logo-big.png"
                            alt="Supership"
                            title="Supership"
                        />
                    </Link>
                </div>
                <Form onSubmit={this.handleSubmit} className="content">
                    <h1 className="title">Login</h1>
                    <Form.Item name='emailOrPhone'>
                        {getFieldDecorator('emailOrPhone', {
                            rules: [{required: true, message: 'Please input your email or phone!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email or Phone"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle style={{display: 'inline'}}>
                            {getFieldDecorator('remember', {
                                rules: [{required: false}],
                            })(<Checkbox className="remember">Remember me</Checkbox>)}

                            <Button type="primary" htmlType="submit" className="login-button" >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form.Item>
                    <div className="register-area">
                        <p>Have no account?&nbsp;
                            <Link to="/register" className="font-red">Register</Link>
                        </p>
                    </div>
                </Form>
                <div className="footer">
                    2020 © SuperShip
                </div>
            </div>
        );
    }
}

LoginPage.propsType = {
    login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    message: state.authReducer.message,
    authenticated: state.authReducer.authenticated,
});

const mapDispatchToProps = dispatch => ({
    login: (emailOrPhone, password) => dispatch(login(emailOrPhone, password)),
});

const WrappedLoginPage = Form.create({name: 'login_form'})(
    connect(mapStateToProps, mapDispatchToProps)(LoginPage),
);

export default WrappedLoginPage;
