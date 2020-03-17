import React, {Component} from 'react';
import {Alert, Button, Card} from "antd";
import './OrderCreationConfirmation.scss'

class OrderCreationConfirmation extends Component {

    isFormValid = (request) => {
        return request.repository_id !== null &&
            request.product.length > 0 &&
            request.receiver.length > 0 &&
            request.address.length > 0 &&
            request.ward_id !== null
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
                            dui
                            mi.
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
                        disabled={this.isFormValid(this.props.data)}
                        onClick={this.props.onRequestSubmitted}
                    >
                        Create Order
                    </Button>
                </div>
            </>
        );
    }
}

export default OrderCreationConfirmation;