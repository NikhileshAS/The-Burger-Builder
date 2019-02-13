import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import ErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import { fetchOrders, setLoading } from "../../redux/actions/order";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onLoadingOrders();
    console.log(this.props.token);

    this.props.onFetchOrders(this.props.token);
  }
  render() {
    let orders = [];
    if (this.props.orders) {
      orders = this.props.orders.map((order, index) => {
        // console.log(order);
        if (
          order[0] !== undefined ||
          order[1] !== undefined ||
          (order[0] !== undefined && order[1] !== undefined)
        ) {
          return <Order key={index} ingredients={order} />;
        }
        return null;
      });
    }
    return this.props.loading ? (
      <Spinner />
    ) : orders ? (
      orders
    ) : (
      <h3>You have No orders!!</h3>
    );
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(fetchOrders(token)),
    onLoadingOrders: () => dispatch(setLoading())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Orders, axios));
