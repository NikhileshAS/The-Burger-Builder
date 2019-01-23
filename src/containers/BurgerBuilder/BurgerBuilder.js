import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
// import { withRouter } from "react-router-dom";

const IngredientPrices = {
  salad: 5,
  cheese: 4,
  meat: 40,
  bacon: 7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    console.log(this.props);

    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  addIngredientHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = this.state.ingredients[type] + 1;
    let newTotalPrice = this.state.totalPrice + IngredientPrices[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
      purchasable: true
    });
  };

  removeIngredientHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] = this.state.ingredients[type] - 1;
    let purchasable = false;

    let newTotalPrice = this.state.totalPrice - IngredientPrices[type];

    newIngredients[type] = newIngredients[type] <= 0 ? 0 : newIngredients[type];

    // for (type in newIngredients) {
    //   if (newIngredients[type] !== 0) {
    //     purchasable = true;
    //     break;
    //   }
    // }

    const totalIngredients = Object.keys(newIngredients)
      .map(igKey => {
        return newIngredients[igKey];
      })
      .reduce((e1, e2) => {
        return e1 + e2;
      }, 0);
    // console.log(arrayOfIngredientValues);

    purchasable = totalIngredients === 0 ? false : true;
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
      purchasable: purchasable
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  confirmOrderHandler = () => {
    let queryParams = [];
    queryParams.push("price=" + this.state.totalPrice);
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    // console.log(this.props);
    let ingredients = { ...this.state.ingredients };
    let OrderSummaryJSX = "";
    if (this.state.loading || !this.state.ingredients) {
      OrderSummaryJSX = <Spinner />;
    } else {
      OrderSummaryJSX = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          confirmOrder={this.confirmOrderHandler}
          ingredients={this.state.ingredients}
          cancelOrder={this.cancelPurchaseHandler}
        />
      );
    }

    let burgerJSX = this.state.ingredients ? (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          purchaseHandler={this.purchaseHandler}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
        />
      </Aux>
    ) : this.state.error ? (
      <p>OOPS! Ingredients failed to load</p>
    ) : (
      <Spinner />
    );
    // let style = this.state.purchasing
    //   ? { transform: "translateY(0)", opacity: "1" }
    //   : { transform: "translateY(-100vh)", opacity: "0" };
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          {OrderSummaryJSX}
        </Modal>
        {burgerJSX}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
