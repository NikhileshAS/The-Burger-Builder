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
    this.props.onFetchOrders();
  }
  render() {
    const orders = this.props.orders.map((order, index) => {
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
    return this.props.loading ? <Spinner /> : orders;
  }
}
const mapStateToProps = state => {
  return { orders: state.order.orders, loading: state.order.loading };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
    onLoadingOrders: () => dispatch(setLoading())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Orders, axios));
