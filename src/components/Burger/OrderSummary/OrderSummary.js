import React from "react";
import Aux from "../../../hoc/Auxilliary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return props.ingredients[igKey] !== 0 ? (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    ) : null;
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your burger has:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Price <strong>₹{props.totalPrice}</strong>
      </p>
      <p>Continue Checking out</p>

      <Button btnType="Success" clicked={props.confirmOrder}>
        Proceed
      </Button>
      <Button btnType="Danger" clicked={props.cancelOrder}>
        Cancel
      </Button>
    </Aux>
  );
};

export default OrderSummary;
