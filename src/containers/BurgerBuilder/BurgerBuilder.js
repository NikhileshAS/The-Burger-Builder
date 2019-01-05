import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const IngredientPrices = {
  salad: 5,
  cheese: 4,
  meat: 40,
  bacon: 7
};
export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

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
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Nikhilesh",
        address: {
          street: "Brindhavan Avenue",
          zip: "641687",
          state: "Tamil Nadu",
          country: "India"
        },
        email: "nikhi.ajay96@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let ingredients = { ...this.state.ingredients };
    // let style = this.state.purchasing
    //   ? { transform: "translateY(0)", opacity: "1" }
    //   : { transform: "translateY(-100vh)", opacity: "0" };
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchaseHandler}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice}
            confirmOrder={this.confirmOrderHandler}
            ingredients={this.state.ingredients}
            cancelOrder={this.cancelPurchaseHandler}
          />
        </Modal>

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
    );
  }
}
