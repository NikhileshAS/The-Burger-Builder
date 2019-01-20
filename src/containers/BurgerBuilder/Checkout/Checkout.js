import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingredients: { salad: 1, meat: 1, bacon: 1, cheese: 2 }
  };
  render() {
    return (
      <Aux>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </Aux>
    );
  }
}
export default Checkout;
