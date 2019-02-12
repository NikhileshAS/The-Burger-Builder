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

export const orderPlaced = () => {
  return { type: actionTypes.ORDER_PLACED };
};

export const placeOrder = order => {
  return dispatch =>
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        // console.log(this.state, this.props);

        this.props.history.push({ pathname: "/" });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error(error);
      });
};
