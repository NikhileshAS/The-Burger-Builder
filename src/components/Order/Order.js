import React from "react";
import classes from "./Order.css";
import Aux from "../../hoc/Auxilliary";
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
    <Aux>
      {props.ingredients[0] && props.ingredients[1] > 0 ? (
        <div className={classes.Order}>
          <div>
            <strong>Ingredients: </strong>
            <p style={style}>Cheese:{props.ingredients[0].cheese}</p>
            <p style={style}>Bacon:{props.ingredients[0].bacon}</p>
            <p style={style}>Salad:{props.ingredients[0].salad}</p>
            <p style={style}>Meat:{props.ingredients[0].meat}</p>
            <p>
              <strong>Price: {props.ingredients[1]}</strong>
            </p>
          </div>
        </div>
      ) : null}
    </Aux>
  );
};

export default Order;
