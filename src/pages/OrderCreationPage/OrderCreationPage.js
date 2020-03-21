import React, {Component} from 'react';
import './OrderCreationPage.scss';
import {Col, Row} from "antd";
import OrderCreationForm from "../../components/OrderCreationForm/OrderCreationForm";
import OrderCreationConfirmation from "../../components/OrderCreationConfirmation/OrderCreationConfirmation";

class OrderCreationPage extends Component {

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    request = {
        repositoryId: null, // number
        product: '', // string
        receiver: '', // string
        address: '', // string
        wardId: null, // number
        moneyTaking: 0 // number
    };

    onRequestChange = (field, value) => {
        this.request[field] = value;
    };

    onRequestSubmitted = () => {
        this.formRef.validateFields();
        return this.formRef.getFieldsValue();
    };

    render() {
        // console.log(this.props);
        return (
            <div id="order-creation">
                <Row>
                    <Col span={15}>
                        <OrderCreationForm
                            onRequestChange={this.onRequestChange}
                            saveFormRef={this.saveFormRef}
                        />
                    </Col>
                    <Col span={9}>
                        <OrderCreationConfirmation
                            onRequestSubmitted={this.onRequestSubmitted}
                            formRef={this.formRef}
                            history={this.props.history}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OrderCreationPage;