import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>It tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.onCancelClicked}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.onConfirmClicked}>
        Continue
      </Button>
    </div>
  );
};
export default CheckoutSummary;
