import React, {Component} from 'react';
import {Button, Form, Icon, Modal, notification, Upload} from 'antd'
import {connect} from "react-redux";
import {uploadOrders} from "../../actions/order.action";
import readXlsxFile from "read-excel-file";

class OrderUploadModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            files: [],
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    handleOk = async () => {
        const {form, uploadOrders} = this.props;
        const {files} = this.state;
        const values = await form.validateFields();

        if (files.length !== 1) {
            notification.error({
                message: 'Failed!',
                description: 'No file selected.',
            });
        } else {
            console.log(values);
            readXlsxFile(files[0].originFileObj).then((rows) => {
                const header = rows[0];
                console.log(header);
                console.log(Object.keys(header));
            });
            // console.log(this.processData(files[0].originFileObj))
            // this.props.uploadOrders(files[0].originFileObj)
            //     .then(res => {
            //         if (res.status === 201) {
            //             notification.success({
            //                 message: 'Success',
            //                 description: 'Uploaded orders successfully',
            //             });
            //         } else {
            //             notification.error({
            //                 message: 'Failed',
            //                 description: 'Failed when uploading orders',
            //             });
            //         }
            //     });
        }


        this.hideModal();
    };

    handleCancel = () => {
        this.hideModal();
    };

    render() {
        const {visible} = this.state;
        const {getFieldDecorator} = this.props.form;
        const draggerProps = {
            onRemove: () => {
                this.props.form.resetFields('uploadObject');
                return true;
            },
            onChange: (uploadObject) => {
                this.setState({files: uploadObject.fileList});
            },
            beforeUpload: file => {
                this.setState({files: file});
                return false;
            },
            accept: '.xls,.xlsx',
            multiple: false,
        };


        return (
            <div>
                <Button type="primary" onClick={this.showModal} style={{margin: '0 10px'}}>
                    Upload Orders
                </Button>
                <Modal
                    title="Upload Orders"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="Upload"
                    onCancel={this.handleCancel}
                >
                    <Form>

                        <Form.Item>
                            {getFieldDecorator('uploadObject', {
                                valuePropName: 'file',
                            })(
                                <Upload.Dragger {...draggerProps}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox"/>
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Upload.Dragger>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    uploadOrders: (file) => dispatch(uploadOrders(file)),
});

const WrappedOrderUploadModal = Form.create({
    name: 'upload_orders_form'
})(connect(null, mapDispatchToProps)(OrderUploadModal));

export default WrappedOrderUploadModal;