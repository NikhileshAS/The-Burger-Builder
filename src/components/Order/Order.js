import React from "react";
import classes from "./Order.css";
const Order = props => {
  // console.log(props);
  const style = {
    textTransform: "capitalize",
    display: "inline-block",
    margin: "0 8px",
    border: "1px solid #ccc",
    padding: "5px"
  };
  return (
    <div className={classes.Order}>
      <div>
        <strong>Ingredients: </strong>
        <p style={style}>Cheese:{props.ingredients[0].cheese}</p>
        <p style={style}>Bacon:{props.ingredients[0].bacon}</p>
        <p style={style}>Salad:{props.ingredients[0].salad}</p>
        <p style={style}>Meat:{props.ingredients[0].meat}</p>
      </div>
      <p>
        <strong>Price: {props.ingredients[1]}</strong>
      </p>
    </div>
  );
};

export default Order;
