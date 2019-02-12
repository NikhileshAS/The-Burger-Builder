import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { fetchIngredients } from "../../redux/actions/burgerBuilder";
// import { withRouter } from "react-router-dom";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    console.log(this.props);
    this.props.fetchIngredients();
  }
  // addIngredientHandler = type => {
  //   const newIngredients = { ...this.props.ingredients };
  //   newIngredients[type] = this.props.ingredients[type] + 1;
  //   let newTotalPrice = this.state.totalPrice + IngredientPrices[type];
  //   this.setState({
  //     ingredients: newIngredients,
  //     totalPrice: newTotalPrice,
  //     purchasable: true
  //   });
  // };

  // removeIngredientHandler = type => {
  //   const newIngredients = [...this.props.ingredients];
  //   newIngredients[type] = this.state.ingredients[type] - 1;
  //   let purchasable = false;

  //   let newTotalPrice = this.state.totalPrice - IngredientPrices[type];

  //   newIngredients[type] = newIngredients[type] <= 0 ? 0 : newIngredients[type];

  //   // for (type in newIngredients) {
  //   //   if (newIngredients[type] !== 0) {
  //   //     purchasable = true;
  //   //     break;
  //   //   }
  //   // }

  //   const totalIngredients = Object.keys(newIngredients)
  //     .map(igKey => {
  //       return newIngredients[igKey];
  //     })
  //     .reduce((e1, e2) => {
  //       return e1 + e2;
  //     }, 0);
  //   // console.log(arrayOfIngredientValues);

  //   purchasable = totalIngredients === 0 ? false : true;
  //   this.setState({
  //     ingredients: newIngredients,
  //     // totalPrice: newTotalPrice,
  //     purchasable: purchasable
  //   });
  // };

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
    // let queryParams = [];
    // queryParams.push("price=" + this.props.totalPrice);
    // for (let i in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.props.ingredients[i])
    //   );
    // }

    // const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout"
    });
  };

  render() {
    // console.log(this.props);
    let ingredients = { ...this.props.ingredients };
    let OrderSummaryJSX = "";
    if (this.state.loading || !this.props.ingredients) {
      OrderSummaryJSX = <Spinner />;
    } else {
      OrderSummaryJSX = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          confirmOrder={this.confirmOrderHandler}
          ingredients={this.props.ingredients}
          cancelOrder={this.cancelPurchaseHandler}
        />
      );
    }

    let burgerJSX = this.props.ingredients ? (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          purchaseHandler={this.purchaseHandler}
          purchasable={this.props.purchasable}
          price={this.props.totalPrice}
          ingredients={this.props.ingredients}
          add={this.props.addIngredient}
          remove={this.props.removeIngredient}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: item =>
      dispatch({ type: actions.ADD_INGREDIENT, payload: item }),
    removeIngredient: item =>
      dispatch({ type: actions.REMOVE_INGREDIENT, payload: item }),
    fetchIngredients: () => dispatch(fetchIngredients())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
