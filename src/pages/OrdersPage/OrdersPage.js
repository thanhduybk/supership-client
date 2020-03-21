import React, {Component} from 'react';
import './OrdersPage.scss';
import {Table} from 'antd';
import {connect} from "react-redux";
import OrderUpdatingModal from "../../components/OrderUpdatingModal/OrderUpdatingModal";
import OrderRemovingModal from "../../components/OrderRemovingModal/OrderRemovingModal";
import {getOrders} from "../../actions/order.action";

const columns = [
    {title: 'No.', dataIndex: 'id', key: 'id'},
    {title: 'Product', dataIndex: 'product', key: 'product'},
    {title: 'Receiver', dataIndex: 'receiver', key: 'receiver'},
    {title: 'Address', dataIndex: 'address', key: 'address'},
    {title: 'Repository', dataIndex: 'repository', key: 'repository'},
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <span>
                <OrderUpdatingModal record={record}/>
                <OrderRemovingModal record={record}/>
            </span>
        )
    }
];

class OrdersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.getMyOrders().then(() => this.setState({loading: false}))
    }


    render() {
        const {orders} = this.props;

        if (this.state.loading) {
            return false;
        }

        return (
            <div id="orders">
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey={order => order.id}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.orderReducer.orders
});

const mapDispatchToProps = dispatch => ({
    getMyOrders: () => dispatch(getOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);