import React, { Component } from "react";
import { Route } from "react-router-dom";
import Aux from "../../hoc/Auxilliary";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, price: price });
  }
  cancelOrder = () => {
    this.props.history.goBack();
  };
  confirmOrder = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <Aux>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCancelClicked={this.cancelOrder}
          onConfirmClicked={this.confirmOrder}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </Aux>
    );
  }
}
export default Checkout;
