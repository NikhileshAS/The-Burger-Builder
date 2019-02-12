import * as actions from "./actions";

const IngredientPrices = {
  salad: 5,
  cheese: 4,
  meat: 40,
  bacon: 7
};

const initialState = { ingredients: [], totalPrice: 4, purchasable: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_INGREDIENT_SUCCESS:
      return { ...state, ingredients: action.payload };

    case actions.ADD_INGREDIENT:
      let addedIngredient = { ...state.ingredients };

      addedIngredient[action.payload] = addedIngredient[action.payload] + 1;
      const addedPrice = state.totalPrice + IngredientPrices[action.payload];
      return {
        ...state,
        ingredients: addedIngredient,
        totalPrice: addedPrice,
        purchasable: true
      };

    case actions.REMOVE_INGREDIENT:
      let removeIngredient = { ...state.ingredients };
      removeIngredient[action.payload] = removeIngredient[action.payload] - 1;
      const deducedPrice = state.totalPrice - IngredientPrices[action.payload];
      return {
        ...state,
        ingredients: removeIngredient,
        totalPrice: deducedPrice
      };

    default:
      return state;
  }
};

export default reducer;
