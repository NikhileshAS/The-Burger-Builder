import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import ErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        const ingredients = Object.keys(response.data).map(key => {
          // console.log(response.data);

          return [response.data[key].ingredients, response.data[key].price];
        });

        this.setState({ orders: ingredients, loading: false });
        // console.log(this.state);
      })
      .catch(error => console.log(error));
  }

  render() {
    const orders = [];
    this.state.orders.map((order, index) => {
      // console.log(order);
      if (
        order[0] !== undefined ||
        order[1] !== undefined ||
        (order[0] !== undefined && order[1] !== undefined)
      ) {
        orders.push(<Order key={index} ingredients={order} />);
      }
    });
    return <div>{orders}</div>;
  }
}
export default ErrorHandler(Orders, axios);
