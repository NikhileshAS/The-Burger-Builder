import * as actionTypes from "../actions";

const initialState = {
  loading: false,
  userID: null,
  token: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS:
      console.log(action);

      return {
        ...state,
        userID: action.payload.userID,
        token: action.payload.token,
        loading: false
      };
    case actionTypes.AUTH_FAILURE:
      return { ...state, error: action.payload.error };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, userID: null, token: null };
    default:
      return state;
  }
};
export default reducer;
