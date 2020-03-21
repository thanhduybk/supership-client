import React, {Component} from 'react';
import './OrderUpdatingModal.scss'
import {updateOrder} from "../../actions/order.action";
import {Button, Form, Input, Modal, notification, Select} from 'antd'
import {connect} from "react-redux";
import {allDistricts, allProvinces, allWards} from "../../actions/address.action";

const {Option} = Select;

class OrderUpdatingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: true,
            provinces: [],
            currentProvince: '',
            districts: [],
            wards: [],
        }
    }

    async componentDidMount() {
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

    show = () => {
        this.setState({visible: true});
    };

    hide = () => {
        this.setState({visible: false});
    };

    handleOk = () => {
        const {form, record, repositories} = this.props;
        // console.log(record);
        form.validateFields().then((values) => {
            const updateRepository = repositories.find(repo => repo.name === values.repository_id);
            this.props.updateOrder(values.id, values.product, values.receiver, values.address, values.ward_id, updateRepository.id, values.money_taking)
                .then((status) => {
                    // console.log(status);
                    if (status === 200) {
                        notification.success({
                            message: 'Success!',
                            description: 'Updated order successfully'
                        })
                    } else {
                        notification.error({
                            message: 'Error!',
                            description: 'Error when updating order'
                        })
                    }
                    this.hide();
                })
        }).catch(error => {
            console.log('Validated fields: ', error);
        });
    };

    handleCancel = () => {
        this.hide();
    };

    onRepositoryChange = (value) => {
        // console.log(value);
        const {form, repositories} = this.props;
        const updateRepository = repositories.find(repo => repo.name === value);
        form.setFieldsValue({
            'repository_id': updateRepository.id
        })
    };

    render() {
        const {loading} = this.state;
        const {record, repositories} = this.props;


        if (loading || !record) {
            return null;
        }
        const {visible, provinces, districts, wards} = this.state;
        const {getFieldDecorator} = this.props.form;

        const fullAddress = record.address.split(', ');

        const address = fullAddress[0];
        // const ward = fullAddress[1];
        const district = fullAddress[2];
        const province = fullAddress[3];

        return (
            <div style={{display: 'inherit', marginRight: 4}}>
                <Button type="primary" onClick={this.show}>
                    Update
                </Button>
                <Modal
                    title="Update Order"
                    visible={visible}
                    footer={[
                        <Button key={2} type="primary" onClick={this.handleOk}>
                            Update
                        </Button>,
                        <Button key={3} onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                    ]}
                >
                    <Form>
                        <Form.Item style={{display: 'none'}}>
                            {getFieldDecorator('id', {
                                rules: [{required: true, message: 'Please input order ID'}],
                                initialValue: record.id || null,
                            })(<Input placeholder="Order ID"/>)}
                        </Form.Item>

                        <Form.Item label="Product">
                            {getFieldDecorator('product', {
                                rules: [{required: true, message: 'Please input the product name'}],
                                initialValue: record.product || null,
                            })(<Input placeholder="Product Name"/>)}
                        </Form.Item>
                        <Form.Item label="Receiver">
                            {getFieldDecorator('receiver', {
                                rules: [{required: true, message: 'Please input the receiver name'}],
                                initialValue: record.receiver,
                            })(<Input placeholder="Receiver"/>)}
                        </Form.Item>
                        <Form.Item label="Province">
                            {getFieldDecorator('province', {
                                initialValue: province || null,
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
                        <Form.Item label="District">
                            {getFieldDecorator('district', {
                                initialValue: district || null,
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
                        <Form.Item label="Ward">
                            {getFieldDecorator('ward_id', {
                                initialValue: null,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select the receiver\'s ward!'
                                    }
                                ]
                            })(
                                <Select>
                                    {wards.map(((value, index) => (
                                        <Option key={index} value={value.id}>{value.name}</Option>
                                    )))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address', {
                                initialValue: address || null,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the detail address!'
                                    }
                                ]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Repository">
                            {getFieldDecorator('repository_id', {
                                initialValue: record.repository || null,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select the repository!'
                                    }
                                ]
                            })(
                                <Select onChange={this.onRepositoryChange}>
                                    {repositories.map(((value, index) => (
                                        <Option key={index} value={value.name}>{value.name}</Option>
                                    )))}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="Money Taking">
                            {getFieldDecorator('money_taking', {})(
                                <Input
                                    type="number"
                                />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    repositories: state.repositoryReducer.repositories
});

const mapDispatchToProps = dispatch => ({
    updateOrder: (id, product, receiver, address, ward_id, repository_id, money_taking) =>
        dispatch(updateOrder(id, product, receiver, address, ward_id, repository_id, money_taking)),
    fetchAllProvinces: () => dispatch(allProvinces()),
    fetchAllDistricts: (province) => dispatch(allDistricts(province)),
    fetchAllWards: (province, district) => dispatch(allWards(province, district)),
});

const WrappedOrderUpdatingModal = Form.create({
    name: 'order_updating_form'
})(connect(mapStateToProps, mapDispatchToProps)(OrderUpdatingModal))

export default WrappedOrderUpdatingModal;