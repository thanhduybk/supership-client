import React, {Component} from 'react';
import {Alert, Button, Card, notification} from "antd";
import './OrderCreationConfirmation.scss'
import {createOrder} from '../../actions/order.action';
import {connect} from "react-redux";
import WrappedOrderUploadModal from "../OrderUploadModal/OrderUploadModal";

class OrderCreationConfirmation extends Component {

    isDataValid = (data) => {
        return data.product !== '' &&
            data.receiver !== '' &&
            data.address !== '' &&
            data.ward_id !== null &&
            data.repository_id !== null &&
            !isNaN(parseInt(data.money_taking));
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = {...this.props.onRequestSubmitted()};

        if (this.isDataValid(data)) {
            this.props.createOrder(data.product, data.receiver, data.address, data.ward_id, data.repository_id, data.money_taking)
                .then(status => {
                    if (status === 201) {
                        notification.success({
                            message: 'Success!',
                            description: 'Created order successfully'
                        });
                        this.props.history.push('/orders');
                    } else {
                        notification.error({
                            message: 'Error!',
                            description: 'Failed to create order'
                        })
                    }
                })
        }
    };

    render() {
        return (
            <>
                <hr/>
                <div id="order-creation-confirm">
                    <Card
                        id="instructions"
                        title="Instructions"
                        bordered={false}
                    >
                        <p>
                            [1] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac blandit purus. Sed in
                            dui mi.
                        </p>
                        <p>
                            [2] Quisque hendrerit enim et neque eleifend cursus. Quisque varius massa ut leo maximus
                            scelerisque.
                        </p>
                    </Card>
                    <div id="fees">
                        <Alert
                            message={<b>Money Taking</b>}
                            description="The amount the recipient must pay on delivery"
                            type="warning"
                        />
                        <Alert
                            message={<b>Total Fee</b>}
                            description="The amount the sender must pay when confronting"
                            type="success"
                        />
                    </div>
                    <Button
                        type="danger"
                        id="submit-button"
                        onClick={this.handleSubmit}
                    >
                        Create Order
                    </Button>

                    <WrappedOrderUploadModal/>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createOrder: (product, receiver, address, wardId, repositoryId, moneyTaking) =>
        dispatch(createOrder(product, receiver, address, wardId, repositoryId, moneyTaking))
});

export default connect(null, mapDispatchToProps)(OrderCreationConfirmation);