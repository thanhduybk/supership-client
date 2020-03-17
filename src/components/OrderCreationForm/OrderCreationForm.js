import React, {Component} from 'react';
import {Form, Input, Select} from "antd";
import {all} from '../../actions/repository.action';
import './OrderCreationForm.scss'
import {connect} from "react-redux";
import {allDistricts, allProvinces, allWards} from "../../actions/address.action";


const {Option} = Select;

class OrderCreationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            provinces: [],
            currentProvince: '',
            districts: [],
            wards: [],
        }
    }

    handleSelectFieldChange(value, field) {
        this.props.onRequestChange(field, value);
    }

    handleInputFieldChange({target: {value}}, field) {
        // console.log(field, value);
        this.props.onRequestChange(field, value);
    };


    async componentDidMount() {
        await this.props.fetchAllRepositories();
        const provinces = await this.props.fetchAllProvinces();
        this.setState({
            loading: false,
            provinces
        });
    }

    async onProvinceChange(value) {
        const districts = await this.props.fetchAllDistricts(value);
        this.setState({districts, currentProvince: value});
    };

    async onDistrictChange(value) {
        const {currentProvince} = this.state;
        const wards = await this.props.fetchAllWards(currentProvince, value);
        this.setState({wards});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                console.log('Received', values);
            }
        });
    };

    parseRepositoryInfo = (repository) => {
        return repository.name + " - " + repository.address;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading, provinces, districts, wards} = this.state;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 21}
            }
        };

        const formInlineItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18}
            }
        };

        if (loading) {
            return null;
        }

        const {repositories} = this.props;

        return (
            <>
                <hr/>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} id="order-creation-form">

                    <Form.Item label="Repository">
                        {getFieldDecorator('repository', {
                            initialValue: null,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select your repository!'
                                }
                            ]
                        })(
                            <Select onSelect={
                                (repositoryId) => this.handleSelectFieldChange(repositoryId, 'repository_id')
                            }>
                                {repositories.map((repo, index) => (
                                    <Option key={index} value={repo.id}>{this.parseRepositoryInfo(repo)}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Product">
                        {getFieldDecorator('product', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your product!'
                                }
                            ]
                        })(<Input onBlur={(e) => this.handleInputFieldChange(e, 'product')}/>)}
                    </Form.Item>

                    <Form.Item label="Receiver" className="inline-field" {...formInlineItemLayout}>
                        {getFieldDecorator('receiver', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input the receiver name!'
                                }
                            ]
                        })(<Input onBlur={e => this.handleInputFieldChange(e, 'receiver')}/>)}
                    </Form.Item>
                    <Form.Item label="Province" className="inline-field" {...formInlineItemLayout}>
                        {getFieldDecorator('province', {
                            initialValue: null,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select the receiver\'s province!'
                                }
                            ],
                        })(
                            <Select onChange={value => this.onProvinceChange(value)}>
                                {provinces.map(((value, index) => (
                                    <Option key={index} value={value.name}>{value.name}</Option>
                                )))}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="Money Taking" className="inline-field" {...formInlineItemLayout}>
                        {getFieldDecorator('money_taking', {})(
                            <Input
                                type="number"
                                onBlur={e => this.handleInputFieldChange(e, 'money_taking')}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="District" className="inline-field" {...formInlineItemLayout}>
                        {getFieldDecorator('district', {
                            initialValue: null,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select the receiver\'s district!'
                                }
                            ]
                        })(
                            <Select onChange={value => this.onDistrictChange(value)}>
                                {districts.map(((value, index) => (
                                    <Option key={index} value={value.name}>{value.name}</Option>
                                )))}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="Address" className="inline-field" {...formInlineItemLayout}>
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input the detail address!'
                                }
                            ]
                        })(<Input onBlur={e => this.handleInputFieldChange(e, 'address')}/>)}
                    </Form.Item>
                    <Form.Item label="Ward" className="inline-field" {...formInlineItemLayout}>
                        {getFieldDecorator('ward', {
                            initialValue: null,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select the receiver\'s ward!'
                                }
                            ]
                        })(
                            <Select onSelect={
                                (wardId) => this.handleSelectFieldChange(wardId, 'ward_id')
                            }>
                                {wards.map(((value, index) => (
                                    <Option key={index} value={value.id}>{value.name}</Option>
                                )))}
                            </Select>
                        )}
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    repositories: state.repositoryReducer.repositories,
});

const mapDispatchToProps = dispatch => ({
    fetchAllRepositories: () => dispatch(all()),
    fetchAllProvinces: () => dispatch(allProvinces()),
    fetchAllDistricts: (province) => dispatch(allDistricts(province)),
    fetchAllWards: (province, district) => dispatch(allWards(province, district)),
});

const WrappedOrderCreationForm = Form.create({
    name: 'order_creation_form',
})(connect(mapStateToProps, mapDispatchToProps)(OrderCreationForm));

export default WrappedOrderCreationForm;