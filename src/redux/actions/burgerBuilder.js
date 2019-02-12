import * as actionTypes from "../actions";
import axios from "../../axios-orders";

export const fetchIngredientsSuccess = data => {
  return { type: actionTypes.FETCH_INGREDIENT_SUCCESS, payload: data };
};

export const fetchIngredientsFailure = () => {
  return { type: actionTypes.FETCH_INGREDIENT_FAILURE };
};

export const fetchIngredients = () => {
  return dispatch =>
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch(fetchIngredientsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailure());
      });
};
