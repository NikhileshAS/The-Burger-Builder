import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {
    label: "Salad",
    type: "salad"
  },
  {
    label: "Bacon",
    type: "bacon"
  },
  {
    label: "Cheese",
    type: "cheese"
  },
  {
    label: "Meat",
    type: "meat"
  }
];

const BuildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total Amount : <strong>₹{props.price}</strong>
    </p>
    {controls.map(control => {
      return (
        <BuildControl
          ingredients={props.ingredients[control.type]}
          add={() => props.add(control.type)}
          remove={() => props.remove(control.type)}
          key={control.label}
          label={control.label}
        />
      );
    })}

    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.purchaseHandler}
    >
      Order Now
    </button>
  </div>
);

export default BuildControls;
