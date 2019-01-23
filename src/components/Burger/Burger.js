import React from "react";
import classes from "./Burger.css";
import { withRouter } from "react-router-dom";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const Burger = props => {
  // console.log(props);

  let ingredients = Object.keys(props.ingredients)
    .map(igKey => {
      // console.log(igKey);
      // console.log([...Array(props.ingredients[igKey])]);initialize empty array of the size specified
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        // console.log(_);
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (ingredients.length === 0) {
    ingredients = <p>Empty buns won't make burger.</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default withRouter(Burger);
