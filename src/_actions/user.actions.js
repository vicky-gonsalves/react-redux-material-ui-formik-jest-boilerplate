import {userConstants} from '../_constants/user.constants';
import {userService} from '../_services/user/user.service';

const setUser = userObj => {
  return {
    type: userConstants.SET_USER,
    payload: userObj
  }
};

const setLoginError = error => {
  return {
    type: userConstants.SET_LOGIN_ERROR,
    payload: {error}
  }
};

const signIn = (userObj) => dispatch => {
  dispatch({
    type: userConstants.SIGN_IN
  });
  userService.signInService(userObj.email, userObj.password, userObj.remember)
    .then(response => {
      // handle success
      dispatch(setUser({
        name: response.user.name,
        email: response.user.email,
        tokens: response.tokens
      }))

    })
    .catch(error => {
      // handle error
      dispatch(setLoginError(error));
    })
};

const signOut = () => dispatch => {
  dispatch({
    type: userConstants.SIGN_OUT
  });
  userService.signOutService();
};


export const actions = {
  setUser,
  setLoginError,
  signIn,
  signOut
};
