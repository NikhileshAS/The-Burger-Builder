import * as actions from "../actions";
import axios from "../../axios-orders";

export const orderPlaced = () => {
  return { type: actions.ORDER_PLACED };
};
export const orderFailed = () => {
  return {};
};

export const initiateOrder = () => {
  return { type: actions.INITIATE_ORDER };
};
export const placeOrder = order => {
  return dispatch => {
    axios
      .post("/orders.json", order)
      .then(response => dispatch(orderPlaced()))
      .catch(error => dispatch(orderFailed()));
  };
};

export const setLoading = () => {
  return { type: actions.ORDERS_LOADING };
};
export const prepareOrders = data => {
  const ingredients = Object.keys(data).map(key => [
    data[key].ingredients,
    data[key].price
  ]);
  console.log(ingredients);

  return {
    type: actions.FETCH_ORDERS,
    payload: { ingredients: ingredients, loading: false }
  };
};

export const fetchOrders = () => {
  return dispatch => {
    axios
      .get("/orders.json")
      .then(response => dispatch(prepareOrders(response.data)))
      .catch(error => console.log(error));
  };
};
