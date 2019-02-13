import * as actions from "../actions";
import Axios from "axios";

export const authFailure = error => {
  return {
    type: actions.AUTH_FAILURE,
    payload: { error: error }
  };
};
export const authSuccess = authData => {
  return {
    type: actions.AUTH_SUCCESS,
    payload: { userID: authData.localId, token: authData.idToken }
  };
};

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
};

export const authLogout = () => {
  return {
    type: actions.AUTH_LOGOUT
  };
};

export const handleAutoLogout = time => {
  // console.log(time);

  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, 3600 * 1000);
  };
};

export const auth = (email, password, isSignIn) => {
  const url = isSignIn
    ? "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBOj1Bv9KLLW-wzpa8cVbNr1_FTiZsV0Y4"
    : "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBOj1Bv9KLLW-wzpa8cVbNr1_FTiZsV0Y4";

  return dispatch => {
    dispatch(authStart());

    Axios.post(url, {
      email: email,
      password: password,
      returnTokenString: true
    })
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
        dispatch(handleAutoLogout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailure(error));
      });
  };
};
