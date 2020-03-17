import React, {Component} from 'react';
import './OrderCreationPage.scss';
import {Col, Row} from "antd";
import OrderCreationForm from "../../components/OrderCreationForm/OrderCreationForm";
import OrderCreationConfirmation from "../../components/OrderCreationConfirmation/OrderCreationConfirmation";

class OrderCreationPage extends Component {


    render() {
        const request = {
            repository_id: null, // number
            product: '', // string
            receiver: '', // string
            address: '', // string
            ward_id: null, // number
            money_taking: 0 // number
        };

        const onRequestChange = (field, value) => {
            request[field] = value;
        };

        const onRequestSubmitted = () => {
            console.log(request);
        };

        return (
            <div id="order-creation">
                <Row>
                    <Col span={15}>
                        <OrderCreationForm onRequestChange={onRequestChange}/>
                    </Col>
                    <Col span={9}>
                        <OrderCreationConfirmation
                            data={request}
                            onRequestSubmitted={onRequestSubmitted}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OrderCreationPage;