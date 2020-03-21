import React, {Component} from 'react';
import {Button, notification, Modal} from "antd";
import {destroyOrder} from "../../actions/order.action";
import {connect} from "react-redux";

const {confirm} = Modal;

class OrderRemovingModal extends Component {
    show = () => {
        const {deleteOrder, record} = this.props;
        confirm({
            title: 'Are you sure to delete this order ?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                deleteOrder(record.id).then(status => {
                    if (status === 200) {
                        notification.success({
                            message: 'Success!',
                            description: 'Deleted order successfully',
                        });
                    } else {
                        notification.error({
                            message: 'Failed!',
                            description: 'Failed when deleting order',
                        });
                    }
                });
            },
        });
    };

    render() {
        return (
            <div style={{display: 'inherit'}}>
                <Button type="danger" onClick={this.show}>
                    Delete
                </Button>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    deleteOrder: (id) => dispatch(destroyOrder(id))
});

export default connect(null, mapDispatchToProps)(OrderRemovingModal);