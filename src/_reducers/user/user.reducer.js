import {userConstants} from '../../_constants';

const getCurrentUser = () => {
  let currentUser;
  if (localStorage.getItem('user') !== null) {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else if (sessionStorage.getItem('user') !== null) {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
  return currentUser;
};

const storedUser = getCurrentUser();

const initialState = {
  name: storedUser && storedUser.user && storedUser.user.name ? storedUser.user.name : null,
  email: storedUser && storedUser.user && storedUser.user.email ? storedUser.user.email : null,
  remember: false,
  isLoggedIn: storedUser && storedUser.user && storedUser.tokens,
  isFetching: false,
  tokens: storedUser && storedUser.tokens ? storedUser.tokens : {},
  loginError: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.SET_USER:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        remember: action.payload.remember,
        isLoggedIn: true,
        isFetching: false,
        tokens: action.payload.tokens,
        loginError: null
      };
    case userConstants.SIGN_IN:
      return {
        ...state,
        isFetching: true,
        loginError: null
      };
    case userConstants.SIGN_OUT:
      return initialState;
    case userConstants.SET_LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        loginError: action.payload.error
      };
    default:
      return state;
  }
};

export default user;
