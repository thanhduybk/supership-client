import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, notification, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../actions/auth.action';
import './RegisterPage.scss';

class RegisterPage extends Component {
    handleSubmit = e => {
        const {form, register} = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                const {
                    shop, name, email, phone, password, referral_code} = values;
                register(
                    shop, name, email, phone, password, referral_code
                ).then((success) => {
                    if (success) {
                        notification.success({
                            message: 'Success!',
                            description: this.props.message,
                        });
                        this.props.history.push('/login');
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
            <div className="register-container">
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
                    <h1 className="title">Register</h1>
                    <Form.Item name='shop'>
                        {getFieldDecorator('shop', {
                            rules: [{required: true, message: 'Please input your shop name!'}],
                        })(
                            <Input
                                prefix={<Icon type="shop" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Your shop name"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Please input your full name!'}],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Your full name"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Please input your email!'}],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Your email"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: 'Please input your phone number!'}],
                        })(
                            <Input
                                prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Your phone number"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your password!'}],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Your password"
                                type="password"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('referral_code', {
                            rules: [{required: false}],
                        })(
                            <Input
                                prefix={<Icon type="wifi" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Your referral code"
                                className="field"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="button" className="login-button" >
                                <Link to="/login">Log in</Link>
                            </Button>

                            <Button type="primary" htmlType="submit" className="register-button" >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form.Item>
                </Form>
                <div className="footer">
                    2020 © SuperShip
                </div>
            </div>
        );
    }
}

RegisterPage.propsType = {
    register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    message: state.authReducer.message,
});

const mapDispatchToProps = dispatch => ({
    register: (
        shop, name, email, phone, password, referral_code
    ) => dispatch(register(
        shop, name, email, phone, password, referral_code
    )),
});

const WrappedRegisterPage = Form.create({name: 'register_form'})(
    connect(mapStateToProps, mapDispatchToProps)(RegisterPage),
);

export default WrappedRegisterPage;
