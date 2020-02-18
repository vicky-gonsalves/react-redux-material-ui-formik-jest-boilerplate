import {mount, shallow} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {history} from '../../_helpers/history';
import {checkProps, findByDataAttr} from '../../_utils';
import config from '../../config';
import DefaultPublicPage, {PublicPage} from './PublicPage';

const mockStore = configureStore([thunk]);

const props = {classes: {main: 'someprop'}};

describe('Public Page', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const propsErr = checkProps(PublicPage, props);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Components Testing', () => {
    let wrapper;
    beforeEach(() => {
      history.push = jest.fn();
      wrapper = shallow(<PublicPage {...props}/>);
    });
    afterEach(() => {
      history.push.mockClear();
    });
    it('should render without error', () => {
      const component = findByDataAttr(wrapper, 'publicPageContainer').first();
      expect(component.length).toBe(1);
    });

    it('should have navbar component', () => {
      const component = findByDataAttr(wrapper, 'navbarComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have footer component', () => {
      const component = findByDataAttr(wrapper, 'footerComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have signIn button component', () => {
      const component = findByDataAttr(wrapper, 'signInButtonComponent').first();
      expect(component.length).toBe(1);
    });

    it('should have message', () => {
      const component = findByDataAttr(wrapper, 'message').first();
      expect(component.length).toBe(1);
      expect(component.text()).toEqual(`This is restricted site. If you have credentials please proceed with Sign In else please EXIT.`);
    });

    it('should have app name', () => {
      const component = findByDataAttr(wrapper, 'appName').first();
      expect(component.length).toBe(1);
      expect(component.text()).toEqual(config.appName);
    });

    it('should redirect to home page if already logged in', () => {
      wrapper.setProps({isLoggedIn: true, tokens: {access: 'access_token'}});
      expect(wrapper.text()).toContain('<Redirect />');
      expect(wrapper.props()).toEqual({to: '/home'});
    });
  });

  describe('Store Checks', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      const props = {
        classes: {main: 'someprop'},
      };
      const initialState = {
        user: {
          isFetching: false, isLoggedIn: true, tokens: {access_tokens: 'sometoken'}
        }
      };
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Router history={history}>
            <DefaultPublicPage {...props}/>
          </Router>
        </Provider>
      );
      //clear SIGN_OUT
      store.clearActions();
    });

    afterEach(() => {
      wrapper.unmount();
      store.clearActions();
    });

    it('should dispatch SET_USER', () => {
      const component = wrapper.find('PublicPage');
      expect(component.props().isFetching).toEqual(false);
      expect(component.props().isLoggedIn).toEqual(true);
      expect(component.props().tokens).toEqual({access_tokens: 'sometoken'});
    });
  });
});
