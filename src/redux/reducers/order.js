import * as actions from "../actions";
const initialState = { loading: false, orders: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ORDER_PLACED:
      return { ...state, loading: false };
    case actions.INITIATE_ORDER:
      return { ...state, loading: true };
    case actions.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload.ingredients,
        loading: action.payload.loading
      };
    case actions.ORDERS_LOADING:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default reducer;
