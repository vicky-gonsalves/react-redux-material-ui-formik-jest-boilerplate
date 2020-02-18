import {userConstants} from '../../_constants';
import user, {getCurrentUser} from './user.reducer';

describe('User Reducer', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });


  it('should return default state', () => {
    const newState = user({}, {});
    expect(newState).toEqual({});
  });

  it('should return new state if SIGN_IN', () => {
    const currentUser = {
      isFetching: true,
      loginError: null
    };
    const newState = user({}, {
      type: userConstants.SIGN_IN,
      payload: currentUser
    });
    expect(newState).toEqual(currentUser);
  });

  it('should return new state if SET_USER', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      remember: false,
      isLoggedIn: true,
      isFetching: false,
      tokens: {},
      loginError: null
    };
    const newState = user({}, {
      type: userConstants.SET_USER,
      payload: currentUser
    });
    expect(newState).toEqual(currentUser);
  });

  it('should return default state if SIGN_OUT', () => {
    const currentUser = {
      email: null,
      isFetching: false,
      isLoggedIn: undefined,
      loginError: null,
      name: null,
      remember: false,
      tokens: {},
    };
    const newState = user({}, {
      type: userConstants.SIGN_OUT,
      payload: currentUser
    });
    expect(newState).toEqual(currentUser);
  });

  it('should return new state if SET_LOGIN_ERROR', () => {
    const currentUser = {
      isFetching: false,
      loginError: undefined
    };
    const newState = user({}, {
      type: userConstants.SET_LOGIN_ERROR,
      payload: currentUser
    });
    expect(newState).toEqual(currentUser);
  });

  it('should return user if localStorage has user object', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      remember: false,
      isLoggedIn: true,
      isFetching: false,
      tokens: {},
      loginError: null
    };
    localStorage.setItem('user', JSON.stringify(currentUser));
    const newState = user({}, {
      type: userConstants.SET_USER,
      payload: currentUser
    });
    expect(newState).toEqual(JSON.parse(localStorage.getItem('user')));
  });

  it('should return user if sessionStorage has user object', () => {
    const currentUser = {
      name: 'Vicky Gonsalves',
      email: 'vicky.gonsalves@outlook.com',
      remember: false,
      isLoggedIn: true,
      isFetching: false,
      tokens: {},
      loginError: null
    };
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    const newState = user({}, {
      type: userConstants.SET_USER,
      payload: currentUser
    });
    expect(newState).toEqual(JSON.parse(sessionStorage.getItem('user')));
  });
});
