import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const Burger = props => {
  let ingredients = Object.keys(props.ingredients).map(igKey => {
    // console.log(igKey);
    return [...Array(props.ingredients[igKey])].map((_, index) => {
      //   console.log(_);
      return <BurgerIngredient key={igKey + index} type={igKey} />;
    });
  });
  //   console.log(ingredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
